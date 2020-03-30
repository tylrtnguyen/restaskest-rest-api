// jshint: es6
import express from 'express'
import {  json, urlencoded } from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import { register, login, protect, 
        managerLogin, employeeLogin } from './utils/auth'
import { connect } from './utils/db'
import userRouter from './resources/user/user.router'
import scheduleRouter from './resources/schedule/schedule.router'
import inventoryRouter from './resources/inventory/inventory.router'
import orderRouter from './resources/order/order.router'
import employeeRouter from './resources/employee/employee.router'
import itemRouter from './resources/item/item.router'
import restaurantRouter from './resources/restaurant/restaurant.router'
import managerRouter from './resources/manager/manager.router'
import materialRouter from './resources/material/material.router'
import paymentRouter from './resources/payment/payment.router'
import stationRouter from './resources/station/station.router'
import payrollRouter from './resources/payroll/payroll.router'


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
// Register route is the private used to 
// add new Admin Account in to the app
app.post('/register', register);
app.post('/login', login);
app.post('/login/manager', managerLogin)
app.post('/login/employee', employeeLogin)

// API Routes
app.use('/api', protect);
app.use('/api/user', userRouter) ; 
app.use('/api/inventory', inventoryRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/order', orderRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/item', itemRouter);
app.use('/api/manager', managerRouter);
app.use('/api/material', materialRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/restaurant', restaurantRouter);
app.use('/api/station', stationRouter);
app.use('/api/payroll', payrollRouter);



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