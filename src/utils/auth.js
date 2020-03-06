import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../resources/user/user.model';
import { Manager } from '../resources/manager/manager.model'
import { Employee } from '../resources/employee/employee.model'
import {registerValidation, loginValidation } from './validation';
import bcrypt from 'bcrypt';


dotenv.config()

export const newToken = user => {
    return jwt.sign({id: user._id}, process.env.TOKEN, {expiresIn: '1h' })
}

export const verifyToken = token => {
    new Promise((resolve, reject) => {
        jwt.verify(token, process.env.TOKEN, (err, payload) => {
            if(err) return reject(err)
            resolve(payload)
        })
    })
}

export const register =  async (req, res) => {
    // Pass user input to validate with Joi
    const {error} = registerValidation(req.body);
    // If error
    if (error) {
        console.log(error)
        return res.status(400).send(error.details[0])
    }

    // Password modification section
    // 1. Salt and hash password
    // Salt
    const salt = await bcrypt.genSalt(10);
    // Hash
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    // Assign the given password with hashPassword
    req.body.password = hashPassword;

    // Creating new user
    try {
        const savedManager = await Manager.create(req.body);
        res.status(201).json({
           success: true,
           data: savedManager
        });
    }
    catch (err) {
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            console.log(err)
            return res.status(400).json({
                success: false,
                error: messages
            })
        }
        else {
            console.log(err)
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}

// Login 
export const login = async (req, res) => {
    const {error} = loginValidation(req.body)
    if(error) {
        return res.status(400).send(error.details[0])
    }

    // Check if the user exists using email
    const userData = req.body
    const user = await User.findOne({email: userData.email}).select('email password')
                    .exec()
    if(!user) {
        return res.status(401).send("Email or password is invalid")
    }

    // Check if the password correct
    const passwordCorrect = await bcrypt.compare(userData.password, user.password)

    if(!passwordCorrect){
        return res.status(400).send("Invalid credentials")
    }

    const token = newToken(user);
    res.status(200).json({
        token:token,
        expiresIn: '3600s',
        status: 'Logged In'
    })
}

// Manager Login 
export const managerLogin = async (req, res) => {
    const {error} = loginValidation(req.body)
    if(error) {
        return res.status(400).send(error.details[0])
    }

    // Check if the user exists using email
    const managerData = req.body
    const manager = await Manager.findOne({email: managerData.email})
                                 .select('email password')
                                 .exec()
    if(!manager) {
        return res.status(401).send("Email or password is invalid")
    }

    // Check if the password correct
    const passwordCorrect = await bcrypt.compare(managerData.password, manager.password)

    if(!passwordCorrect){
        return res.status(400).send("Invalid credentials")
    }

    const token = newToken(manager);
    res.status(200).json({
        token:token,
        expiresIn: '3600s',
        status: 'Logged In'
    })
}

// Employee Login 
export const employeeLogin = async (req, res) => {
    const {error} = loginValidation(req.body)
    if(error) {
        return res.status(400).send(error.details[0])
    }

    // Check if the user exists using email
    const employeeData = req.body
    const employee = await Employee.findOne({email: employeeData.email})
                                 .select('email password')
                                 .exec()
    if(!employee) {
        return res.status(401).send("Email or password is invalid")
    }

    // Check if the password correct
    const passwordCorrect = await bcrypt.compare(employeeData.password, employee.password)

    if(!passwordCorrect){
        return res.status(400).send("Invalid credentials")
    }

    const token = newToken(employee);
    res.status(200).json({
        token:token,
        expiresIn: '3600s',
        status: 'Logged In'
    })
}


export const protect = async (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith("Bearer ")) {
      return res.status(401).end();
    }
  
    const token = bearer.split("Bearer ")[1].trim();
    let payload;
    try {
      payload = await verifyToken(token);
    } catch (e) {
      return res.status(401).end();
    }
  
    req.user = payload;
    next();
};

