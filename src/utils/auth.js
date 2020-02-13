import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../resources/user/user.model';
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
    if (error) return res.status(400).send(error.details[0])

    // Password modification section
    // 1. Salt and hash password
    // Salt
    const salt = await bcrypt.genSalt(10);
    // Hash
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    // Creating new user
    try {
        const savedUser = await user.save();
        res.status(201).json({
            message: `Admin ${savedUser.name} is already saved`
        });
    }
    catch (e) {
        console.log(e)
        res.status(400).send(err)
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


export const protect = async (req, res, next) => {
    const bearer = req.headers.authorization

    if(!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).send("Not authorized")
    }

    const token = bearer.split(" ")[1]

    let payload
    try {
        payload = await verifyToken(token)
    }
    catch (e) {
        return res.status(401).send("Invalid token")
    }

    req.user = payload
    next()
}

