const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const path = require('path')

const resourceLimits = require('worker_threads');
const e = require('express');
const { stat } = require('fs');


const app = express();
const PORT = process.env.PORT || 8081

//file  upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images')
    }, 
    filename:(req, file, cb) => {
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
})
  
const upload = multer({
    storage:storage
})


//make connection between dbsever and node app

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "db_lms"
})
//email Sending - Nodemailer transporter

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
});


// middleware
app.use(express.json())
app.use(cors())
app.use(express.static('public')); 

// all end pints start

// endpint for email subscribe

app.post('/EmailSubscribe', (req, res) => {
    const checkSql = "SELECT * FROM email_subscribe WHERE Email = ?"
    connection.query(checkSql, [req.body.email], (err, result) => {
        if(err) throw err
        
        if(result.length === 0){
            const sql = "INSERT INTO email_subscribe(Email, join_at) VALUES (?)";            
            const create_at = new Date()

            const values = [
                req.body.email,
                create_at
            ]            

            connection.query(sql, [values], (err, result) => {
                if(err){
                    return res.json({Error: "Error on Server1"})
                    // console.log(err)
                }
                else{
                    return res.json({Status: "Success"})
                }
            })
        }   
        else{
            return res.json({Error: "You Already Subscribe for Updates"})
        }
    })
})

// SignUp endPoint

app.post('/SignUp', (req, res) => {
    // console.log(req.body)

    const checkSql = "SELECT * FROM users WHERE Email = ?"
    connection.query(checkSql, [req.body.email], (err, result) => {
        if(err) throw err

        if(result.length === 0){
            bcrypt.hash(req.body.password, 10, (err, hashPass) => {
                if(err) throw err

                const role = "user"
                const is_active = 1
                const is_lock = 0
                const create_at = new Date

                const sql = "INSERT INTO users(username, Email, Password, Role, is_active, is_lock, create_at) VALUES (?)"
                const values = [    
                    req.body.username,
                    req.body.email,
                    hashPass,
                    role,
                    is_active,
                    is_lock,
                    create_at
                ]

                connection.query(sql, [values], (err, result) => {
                    if(err) {
                        return res.json({Error: "Error on Server"})
                    }
                    else{
                        return res.json({Status: "Success"})
                    }
                })
            })
        }
        else{
            return res.json({Error: "You Already Registered"})
        }
    })
})

// end point for SignIn

app.post('/SignIn', (req, res) => {
    // console.log(req.body)

    const sql = "SELECT * FROM users WHERE Email = ?"
    connection.query(sql, [req.body.email], (err, result) => {
        if(err) throw err

        if(result.length > 0){
            const password = req.body.password;
            bcrypt.compare(password, result[0].Password, (err, passMatch) => {
                if(err) throw err

                if(passMatch){
                    //generate JWT Token
                    const token = jwt.sign(
                        {email: result[0].email, role: result[0].role, is_active: result[0].is_active, is_lock: result[0].is_lock},
                        'your-secret-key',
                        {expiresIn: '1h'}
                    );
                    res.json({Token: token, Msg: "Success", LoginUser:result})
                    console.log(result)
                }
                else{
                    return res.json({Error: "Password Not Match"})
                }
            })
        }
        else{
            return res.json({Error: "No User Found...."})
        }
    })
})

// All users

app.get('/AllUsers', (req, res) => {
    const sql = "SELECT * FROM users"
    connection.query(sql, (err, result) => {
        if(err) {
            return res.json({Error: "Error on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

// count all user

app.get('/AllCountUsers', (req, res) => {
    const sql = "SELECT COUNT(ID) AS UserAll FROM users";
  
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ UserAll: results[0].UserAll }); // Send count in JSON format
    });
})

// UserTypeUsers

app.get('/UserTypeUsers', (req, res) => {
    const sql = "SELECT COUNT(ID) AS CountUserT FROM users WHERE role = ?";
    const role = "user"

    connection.query(sql, [role], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ CountUserT: results[0].CountUserT }); // Send count in JSON format
    });
})

// CountSuperAdmin

app.get('/CountSuperAdmin', (req, res) => {
    const sql = "SELECT COUNT(ID) AS CountUserT FROM users WHERE role = ?";
    const role = "SuperAdmin"

    connection.query(sql, [role], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ CountUserT: results[0].CountUserT }); // Send count in JSON format
    });
})

// GetCurrentUser

app.get('/GetCurrentUser/:id', (req, res) => {
    const userEmail = req.params.id

    const sql = "SELECT * FROM users WHERE Email = ?"
    connection.query(sql, [userEmail], (err, result) => {
        if(err) {
            return res.json({Error: "ERROR on Server"})
        }
        else{
            return res.json(result)
        }
    })
})

// Update My Data

app.post('/UpdateMyData/:id', (req, res) => {
    const userEmail = req.params.id

    const sql = "UPDATE users SET username = ? WHERE Email = ?"
    connection.query(sql, [req.body.username, userEmail], (err, result) => {
        if(err) {
            return res.json({Error: "ERROR on Server"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

// Test book search

// app.get('/BookSearch', (req, res) => {
//     console.log(req.body.bookTitle)
// })


// forgetpass

app.post('/PassForget', (req, res) => {
    // console.log(req.body)

    const checkSql = "SELECT * FROM users WHERE email = ?"
    connection.query(checkSql, [req.body.email], (err, result) => {
        if(err) throw err

        if(result.length === 0){
            return res.json({Error: "Email Not Found...!"})
        }
        else{
            const min = 100000;
            const max = 999999;
            //get randoem number between above given 2 numbers
            const otpNumber = Math.floor(Math.random() * (max - min + 1)) + min;

            console.log(otpNumber)
            const StringOTP = otpNumber.toString()

            // hash the otpnumber for security purposes
            bcrypt.hash(StringOTP, 10, (err, hashOtp) => {
                if(err) throw err

                else{
                    const sql = "INSERT INTO forget_pass(email, otp_no)VALUES(?)"
                    const values = [
                        req.body.email,
                        hashOtp
                    ]

                    connection.query(sql, [values], (err, result) => {
                        if(err) {
                            return res.json({Error: "Error on Server1"})
                        }
                        else{
                            // sending otp using email
                            var mailOptions = {
                                from: process.env.EMAIL_USER,
                                to: req.body.email,
                                subject: 'Password Reset OTP of Library System',
                                text: 'Your Password Reset OTP is: '+ otpNumber, 
                            };

                            transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                  console.log(error);
                                } else {
                                  console.log('Email sent: ' + info.response);
                                  return res.json({Status: "Success"})
                                }
                            });
                        }
                    })
                }
            })
        }
    })
})


// check otp

app.post('/OTPCheck/:id', (req, res) => {
    const Email = req.params.id
    // console.log(Email)

    // console.log(req.body.otp)
    const otp = req.body.otp

    const checkSql = "SELECT * FROM forget_pass WHERE email = ?"
    connection.query(checkSql, [Email], (err, result) => {
        if(err) throw err

        if(result.length === 0){
            return res.json({Error: "No Recodes found"})
        }
        else{
            bcrypt.compare(otp, result[0].otp_no, (err, OTPMatch) => {
                if(err) throw err

                if(OTPMatch){
                    // generate JWT Token
                    const token = jwt.sign(
                        {email: result[0].email},
                        'your-secret-key',
                        {expiresIn: '5m' }
                    );
                    return res.json({Status: "Success", token:token, CheckEmail:result})
                }
                else{
                    return res.json({Error: "Error111"})
                }
            })
        }
    }) 
})

// Update password

app.post('/UpdatePassword/:id', (req, res) => {
    const userEmail = req.params.id

    // console.log(userEmail, req.body)

    if(req.body.newPass !== req.body.cnewPass){
        return res.json({Error: "Password Not Match"})
    }
    else if(req.body.email !== userEmail){
        return res.json({Error: "Check the Email"})
    }
    else{
        // Hash the Password
        bcrypt.hash(req.body.newPass, 10, (err, hashNewPass) => {
            if(err) throw err

            if(hashNewPass){
                const sql = "UPDATE users SET Password = ? WHERE Email = ?"
                connection.query(sql, [hashNewPass, userEmail], (err, result) => {
                    if(err){
                        return res.json({Error: "Internal Server ERROR"})
                    }
                    else{
                        return res.json({Status: "Success"})
                    }
                })
            }
        })
    }
})

// all end points end

//check the server is working
app.listen(PORT, () => console.log(`Server is Running on PORT ${PORT}`));