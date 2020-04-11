"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveStripeRecord = undefined;

var _nodemailer = require("nodemailer");

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stripe = require('stripe')('sk_test_PbX6P4RUlkeJbTHl9wLR0iRh00tyy52WRn');

_dotenv2.default.config();
/* 
@endpoint: /api/payment
@method: POST
@input: null
@output: [{
    employeeId,
    date,
    employeeName,
    start,
    stop
}]
*/


const stripeProcessor = async (req, res) => {
  try {
    const tokenObject = req.body.stripe_token;
    const customerPlan = req.body.plan; // Destructure the custommerPlan object

    const {
      amount,
      currency,
      description
    } = customerPlan;
    const charge = await stripe.charges.create({
      amount,
      currency,
      description,
      source: tokenObject
    });

    if (!charge) {
      return res.status(400).json({
        success: false,
        message: "Cannot charge"
      });
    } // Return only the charge object if successfully charged


    return charge;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}; // Save charge object to db


const saveStripeRecord = exports.saveStripeRecord = model => async (req, res) => {
  try {
    // Get data from stripe processor
    const chargeObject = await stripeProcessor(req, res);
    console.log(chargeObject);
    const dataToSave = {
      stripe_id: chargeObject.id,
      object_type: chargeObject.object,
      amount: chargeObject.amount,
      description: chargeObject.description,
      failure_message: chargeObject.failure_message,
      billing_details: chargeObject.billing_details,
      paid: chargeObject.paid
    }; // Send email

    const sentEmail = await sendEmail(dataToSave);
    console.log(sentEmail); // Save data to database

    const savedRecord = await model.create(dataToSave);

    if (!savedRecord) {
      return res.status(400).json({
        success: false,
        message: "Failed to add record to database"
      });
    }

    res.status(200).json({
      success: true,
      data: savedRecord
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}; // Using nodemailer to send invoice to user


const sendEmail = savedRecord => async (req, res) => {
  const transporter = _nodemailer2.default.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.TEST_EMAIL,
      pass: process.env.TEST_PASSWORD
    }
  });

  const email_to = savedRecord.billing_details.email;
  const mailOptions = {
    from: 'projectsgroup17@gmail.com',
    to: email_to,
    subject: "Thanks for choosing ResTaskest",
    text: "Your payment has successfully made"
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};