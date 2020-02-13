// jshint: es6
import express from 'express'
import {  json, urlencoded } from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import { register, login, protect } from './utils/auth'
import { connect } from './utils/db'
import userRouter from './resources/user/user.router'
import managerRouter from './resources/manager/manager.router'


const app = express();

dotenv.config()

const port = process.env.PORT || 5000;

app.use(json())
app.use(urlencoded({extended: true}))
app.use(cors())

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

// Authentication routes
app.post('/register', register);
app.post('/login', login);

// API Routes
app.use('/api', protect)
app.use('/api/user', userRouter)


export const start = async () => {
    try {
      await connect()
      app.listen(port, () => {
        console.log(`REST API on http://localhost:${port}`)
      })
    } catch (e) {
      console.error(e)
    }
  }
  
  start()