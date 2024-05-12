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

    // check the email end with @nifs.ac.lk
    /*
        check the user is already have an nifs email address
    */

    // const checkEmail =  email.endsWith('@nifs.ac.lk');

    if(req.body.email.endsWith('@nifs.ac.lk')){
        const checkReject = "SELECT * FROM rejected_user_requests WHERE Email = ?"
        connection.query(checkReject, [req.body.email], (err, result) => {
            if(err) throw err

            if(result.length === 0){
                const checkSql = "SELECT * FROM users WHERE Email = ? || username = ?"
                connection.query(checkSql, [req.body.email, req.body.username], (err, result) => {
                    if(err) throw err
            
                    if(result.length === 0){
                        
                        bcrypt.hash(req.body.password, 10, (err, hashPass) => {
                            if(err) throw err
            
                            const role = "user"
                            const is_active = 0
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
            }
            else{
                return res.json({Error: "Your Entered Email Address already Rejected by Admin"})
            }
        })
    }
    else{
        return res.json({Error: "Your are not a NIFS Member"})
    }

 
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

        if(result.length !== 1){
            return res.json({Error: "Email Alredy Send"})
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
                        const deletePassOTP = "DELETE FROM forget_pass WHERE email = ?"
                        connection.query(deletePassOTP, [userEmail], (err, result) => {
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
    }
})


// Add new Book
// AddBook

app.post('/AddBook', (req, res) => {
    // console.log(req.body)

    const checkSql = "SELECT * FROM books WHERE ISBNNumber = ?"
    connection.query(checkSql, [req.body.isbnNo], (err, result) => {
        if(err) throw err

        if(result.length === 0){
            if(req.body.KeyWord1 === req.body.KeyWord2){
                return res.json({Error: "KeyWrods are Same, Enter Defferent KeyWords"})
            }
            else{
                const sql = "INSERT INTO books(BookTitle, ClassNo, AuthorEditor, AuthorEditor2, Discription, ISBNNumber, Keywords, Keywords2, Publisher, PubYear, PubPlace, Create_at, Status) VALUES(?)"
                const create_at = new Date()
                const Status = "Available"
                const values = [
                    req.body.title, 
                    req.body.classNo, 
                    req.body.Author1, 
                    req.body.Author2, 
                    req.body.Description, 
                    req.body.isbnNo,                     
                    req.body.KeyWord1, 
                    req.body.KeyWord2, 
                    req.body.Publisher, 
                    req.body.pubYear, 
                    req.body.pubPlace, 
                    create_at,
                    Status
                ]

                connection.query(sql, [values], (err, result) => {
                    if(err) {
                        return res.json({Error: "Internal Server Error"})
                        // console.log(err)
                    }
                    else{
                        return res.json({Status: "Success"})
                    }
                })
            }
        }
        else{
            return res.json({Error: "The Book Already in Database"})
        }
    })
})

// count all books in data base
app.get('/BooksCount', (req, res) => {
    const sql = "SELECT COUNT(ID) AS BKCount FROM books";
  
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ BKCount: results[0].BKCount }); // Send count in JSON format
    });
})

// Search Books
// SearchBook

app.post('/SearchBook', (req, res) => {
    console.log(req.body)
    const  {title, author, isbn, KeyWord, Publisher, pubYear, pubplace} = req.body

    if(title === '' && author === '' && isbn === '' && KeyWord === '' && Publisher === '' && pubYear === '' && pubplace === ''){
        return res.json({Error: "Please Fill at least one input Feild"})
    }
    
    // check the above values are empty or not
    // and get value only colums that value has

    let conditions = [];

    if(title.trim()){
        conditions.push(`BookTitle LIKE '%${title}%'`);
    }
    if(author.trim()){
        conditions.push(`AuthorEditor LIKE '%${author}%' OR AuthorEditor2 LIKE '%${author}%'`);
    }
    if(isbn.trim()){
        conditions.push(`ISBNNumber LIKE '%${isbn}%'`);
    }
    if(KeyWord.trim()){
        conditions.push(`Keywords LIKE '%${KeyWord}%' OR Keywords2 LIKE '%${KeyWord}%'`);
    }
    if(Publisher.trim()){
        conditions.push(`Publisher LIKE '%${Publisher}%'`);
    }
    if(pubYear.trim()){
        conditions.push(`PubYear LIKE '%${pubYear}%'`);
    }
    if(pubplace.trim()){
        conditions.push(`PubPlace LIKE '%${pubplace}%'`);
    }

    let whereClause = '';
    if (conditions.length > 0) {
      whereClause = 'WHERE ' + conditions.join(' AND ');
    }

    const sql = `SELECT * FROM books ${whereClause}`;

    // search data
    // const sql = `SELECT * FROM books WHERE 
    //     BookTitle LIKE '%${title}%' AND 
    //     AuthorEditor LIKE '%${author}%' OR 
    //     AuthorEditor2 LIKE '%${author}%' AND
    //     ISBNNumber LIKE '%${isbn}%' AND
    //     Keywords LIKE '%${KeyWord}%' OR
    //     Keywords2 LIKE '%${KeyWord}%' AND
    //     Publisher LIKE '%${Publisher}%' AND 
    //     PubYear LIKE '%${pubYear}%' AND
    //     PubPlace LIKE '%${pubplace}%'`;



    connection.query(sql, (err, result) => {
        if(err) {
            return res.json({Error: "Internal Server Error"})
            // console.log(err)
        }
        else if(result.length === 0){
            return res.json({Error: "No Recodes Found"})
        }
        else{
             return res.json({Status: "Success", BookData: result})
        }
    })
})


// get last 3 recodes in books table
// GetlastBooks

app.get('/GetlastBooks', (req, res) => {
    const sql = "SELECT * FROM books ORDER BY ID DESC LIMIT 3"

    connection.query(sql, (err, result) => {
        if(err) {
            return res.json({Error: "Internal Server Error"})
        }
        else{
            return res.json(result)
        }
    })
})

// fetch all books
// AllBooks

app.get('/AllBooks', (req, res) => {
    const sql = "SELECT * FROM books"

    connection.query(sql, (err, result) => {
        if(err) {
            return res.json({Error: "Internal Server Error"})
        }
        else{
            return res.json(result)
        }
    })
})

// Disabled a book
// DisabledBook

app.post('/DisabledBook/:id', (req, res) => {
    const BookISBN = req.params.id

    // check the book is already Disabled
    const checkDis = "SELECT * FROM books WHERE ISBNNumber = ?"
    connection.query(checkDis, [BookISBN], (err, result) => {
        if(err) throw err

        if(result[0].Status === "Disabled"){
            return res.json({Error: "The Book is Already Disabled"})            
        }
        else{
            // disabled query
            const sql = "UPDATE books SET Status = ? WHERE ISBNNumber = ?"
            const status = "Disabled"

            connection.query(sql, [status, BookISBN], (err, result) => {
                if(err) {
                    return res.json({Error: "Internal Server Error"})
                }
                else{
                    return res.json({Status: "Success"})
                }
            })
        }
    })
})

// Enable book
// EnableBook

app.post('/EnableBook/:id', (req, res) => {
    const BookISBN = req.params.id

    // enable book
    const sql = "UPDATE books SET Status = ? WHERE ISBNNumber = ? "
    const status = "Available"

    connection.query(sql, [status, BookISBN], (err, result) => {
        if(err) {
            return res.json({Error: "Internal Server Error"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

// Reject User Request
// RejectUserRequest

app.post('/RejectUserRequest/:id', (req, res) => {
    userEmail = req.params.id

    // reject query

    const sql = "DELETE FROM users WHERE Email = ?"
    connection.query(sql, [userEmail], (err, result) => {
        if(err) {
            return res.json({Error: "Internal Server Error Wihle Deleting User"})
        }
        else{
            // insert Data to reject table

            const rejectUsersql = "INSERT INTO rejected_user_requests (Email, reject_at) VALUES(?)"
            const reject_at = new Date()

            const values = [
                userEmail,
                reject_at
            ]

            connection.query(rejectUsersql, [values], (err, result) => {
                if(err) {
                    return res.json({Error: "Internal Server Error while data inserting"})
                }
                else{
                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: userEmail,
                        subject: 'SignUp Request NIFS Library',
                        text: 'Your SignUp Request has been Rejected from System', 
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
})

// accept user Request
// AcceptUserRequest

app.post('/AcceptUserRequest/:id', (req, res) => {
    const userEmail = req.params.id

    // update user
    const sql = "UPDATE users SET is_active = ? WHERE Email = ?"
    const is_active = 1;

    connection.query(sql, [is_active, userEmail], (err, result) => {
        if(err) {
            return res.json({Error: "Intenal Server Error"})
        }
        else{
            var mailOptions = {
                from: process.env.EMAIL_USER,
                to: userEmail,
                subject: 'SignUp Request NIFS Library',
                text: 'Your SignUp Request has been Approved from System', 
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
})


// Count all reject user Requests

app.get('/CountUsersReject', (req, res) => {
    const sql = "SELECT COUNT(ID) AS UserRejectDB FROM rejected_user_requests";
  
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ UserRejectDB: results[0].UserRejectDB }); // Send count in JSON format
    });
})


// get all data from reject user requests
// RejectAllUsers

app.get('/RejectAllUsers', (req, res) => {
    const sql = "SELECT * FROM rejected_user_requests"

    connection.query(sql, (err, result) => {
        if(err) {
            return res.json({Error: "Internal Server Error"})
        }
        else{
            return res.json(result)
        }
    })
})


// search users
// SearchUsers

app.post('/SearchUsers', (req, res) => {
    // console.log(req.body)

    if(req.body.UserSearchData === '' && req.body.RadioInputData === ''){
        return res.json({Error: "Please Fill or Select on input"})
    }
    else{
        let conditions = [];

        if(req.body.UserSearchData.trim()){
            conditions.push(`Email = '${req.body.UserSearchData}'`);
        }
        if(req.body.RadioInputData.trim()){
            conditions.push(`Role = '${ req.body.RadioInputData === "SuperAdmin" ? "SuperAdmin" : null }' OR Role = '${ req.body.RadioInputData === "user" ? "user" : null }' OR is_active = '${ req.body.RadioInputData === '0' ? parseInt(req.body.RadioInputData) : null }' OR is_lock = ${ req.body.RadioInputData === '1' ? parseInt(req.body.RadioInputData) : null }`)
        }

        let whereClause = '';
        if (conditions.length > 0) {
          whereClause = 'WHERE ' + conditions.join(' AND ');
        }
    
        const sql = `SELECT * FROM users ${whereClause}`;

        connection.query(sql, (err, result) => {
            if(err) {
                return res.json({Error: "Internal Server ERROR"})
                // console.log(err)
                // console.log(sql)
            }
            else if(result.length === 0){
                return res.json({Error: "No recodes Found"})
                // console.log(sql)
            }
            else{
                // console.log(result)
                // console.log(sql)
                return res.json({Status: "Success", UserData:result})
            }
        })
    }
})

// lock user account
app.post('/LockUserAccount/:id', (req, res) => {
    const userEmail = req.params.id

    const sql = "UPDATE users SET is_lock = ? WHERE Email = ?"

    const is_lock = 1

    connection.query(sql, [is_lock, userEmail], (err, result) => {
        if(err) {
            return res.json({Error: "Internal Server Error"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

// unlock Account
app.post('/UnLockAccount/:id', (req, res) => {
    const userEmail = req.params.id

    const sql = "UPDATE users SET is_lock = ? WHERE Email = ?"

    const is_lock = 0

    connection.query(sql, [is_lock, userEmail], (err, result) => {
        if(err) {
            return res.json({Error: "Internal Server Error"})
        }
        else{
            return res.json({Status: "Success"})
        }
    })
})

// Reject Account
app.post('/RejectAccount/:id', (req, res) => {
    const userEmail = req.params.id

    // frst delete from user tabel
    const deleteUser = "DELETE FROM users WHERE Email = ?"
    connection.query(deleteUser, [userEmail], (err, result) => {
        if(err) {
            return res.json({Error: "Internal Server Error While deleting from user table"})
        }
        else{
            // now inset to rejected_user_requests table

            const rejectSql = "INSERT INTO rejected_user_requests (Email,reject_at) VALUES (?)"
            const reject_at = new Date()
            const values = [
                userEmail,
                reject_at
            ]

            connection.query(rejectSql, [values], (err, result) => {
                if(err) {
                    return res.json({Error: "Internal Server Error While adding data to rejected_user_requests"})
                }
                else{
                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: userEmail,
                        subject: 'Account Rejected Message NIFS Library',
                        text: 'Your Account has been Rejected from System', 
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

})

// book borrow Request
// BorrowBook

app.post('/BorrowBook/:id', (req, res) => {
    const BookID = req.params.id
    // console.log(BookID, req.body)

    
    const sql = "UPDATE books SET Status = ? WHERE ISBNNumber = ?"
    const status = "Requested"
    
    connection.query(sql, [status, BookID], (err, result) => {
        if(err) {
            return res.json({Error: "Internal Server Error"})
        }
        else{
            const makeRequest = "INSERT INTO book_borrow_request(bookISBN, borrowEmail, borrow_at, status) VALUES (?)"

            const borrow_at = new Date()
            const status = "Request"

            const values = [
                BookID,
                req.body.EmailUser,
                borrow_at,
                status
            ]

            connection.query(makeRequest, [values], (err, result) => {
                if(err) {
                    return res.json({Error: "Internal Server Error making Request"})
                }
                else{
                    return res.json({Status: "Success"})
                }
            })
            
        }
    })

})

// count my Book Requests
// MyCountRequests

app.get('/MyCountRequests/:id', (req, res) => {
    const userEmail = req.params.id

    const sql = "SELECT COUNT(ID) AS MyBookRequests FROM book_borrow_request WHERE status = ? && borrowEmail = ?";

    const status = "Request"
    
  
    connection.query(sql, [status, userEmail], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ MyBookRequests: results[0].MyBookRequests }); // Send count in JSON format
    });


})

// Count my book Requests
// CountMyRequests

app.get('/CountMyRequests/:id', (req, res) => {
    const userEmail = req.params.id

    const sql = "SELECT COUNT(ID) AS CountMyBooks FROM book_borrow_request WHERE borrowEmail = ?";
  
    connection.query(sql, [userEmail], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ CountMyBooks: results[0].CountMyBooks }); // Send count in JSON format
    });

})


// fetch my book requests
// MyRequestsBook

app.get('/MyRequestsBook/:id', (req, res) => {
    const userEmail = req.params.id

    const sql = "SELECT * FROM book_borrow_request WHERE borrowEmail = ?"
    connection.query(sql, [userEmail], (err, result) => {
        if(err) {
            return res.json({Error: "Internal Server Error"})
        }
        else{
            return res.json(result)
        }
    })
})

// unselected books
// UnSelectBooks

app.post('/UnSelectBooks/:id', (req, res) => {
    const BookISBN = req.params.id
    // console.log(BookISBN, req.body)

    const sql = "UPDATE books SET Status = ? WHERE ISBNNumber = ?"
    const status = "Available"
    connection.query(sql, [status, BookISBN], (err, result) => {
        if(err){
            return res.json({Error: "Internal Server Error"})
        }
        else{
            // delete from book request
            
            const deleteRequest = "DELETE FROM book_borrow_request WHERE bookISBN = ? && borrowEmail = ? && status = ?"
            const status = "Request"

            connection.query(deleteRequest, [BookISBN, req.body.EmailUser, status], (err, result) => {
                if(err) {
                    return res.json({Error: "Internal Server Error while deleting request"})
                }
                else{
                    return res.json({Status: "Success"})
                }
            })
        }
    })
})

// count book borrow requests
// CountBorrowRequests

app.get('/CountBorrowRequests', (req, res) => {
    const sql = "SELECT COUNT(ID) AS BorrowRequestBooks FROM book_borrow_request WHERE status = ?";
    const status = "Request"
    connection.query(sql, [status], (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Error fetching data' });
        return;
      }
  
      res.json({ BorrowRequestBooks: results[0].BorrowRequestBooks }); // Send count in JSON format
    });
})

// fetch book borrow Requests
// BookBorrowRequest

app.get('/BookBorrowRequest', (req, res) => {
    const sql = "SELECT * FROM book_borrow_request"
    connection.query(sql,  (err, result) => {
        if(err) {
            return res.json({Error: "Internal Server Error"})
        }
        else{
            return res.json(result)
        }
    })
})

// Accept Book request
// AcceptBookRequest

app.post('/AcceptBookRequest/:id', (req, res) => {
    const BookISBN = req.params.id
    // console.log(BookISBN, req.body)

    const checkBook = "SELECT * FROM book_borrow_request WHERE bookISBN = ? && borrowEmail = ? && status = ?"
    const status = "Request"

    connection.query(checkBook, [BookISBN, req.body.Email, status], (err, result) => {
        if (err) throw err

        if(result){
            const sql = "UPDATE book_borrow_request SET status = ? WHERE bookISBN = ?"
            const status = "Accept"

            connection.query(sql, [status, BookISBN], (err, result) => {
                if(err) {
                    return res.json({Error: "Interal Server Error"})
                }
                else{
                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: borrower,
                        subject: 'Notification From Library NIFS',
                        text: 'Your Book Request has been Accepted..', 
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
})

// book request reject
// RejecttBookRequest 

app.post('/RejecttBookRequest/:id', (req, res) => {
    const BookISBN = req.params.id
    // console.log(BookISBN, req.body)

    const checkBook = "SELECT * FROM book_borrow_request WHERE bookISBN = ? && borrowEmail = ? && status = ?"
    const status = "Request"

    connection.query(checkBook, [BookISBN, req.body.Email, status], (err, result) => {
        if (err) throw err

        if(result){
            const sql = "UPDATE book_borrow_request SET status = ? WHERE bookISBN = ?"
            const status = "Reject"

            connection.query(sql, [status, BookISBN], (err, result) => {
                if(err) {
                    return res.json({Error: "Interal Server Error"})
                }
                else{
                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: borrower,
                        subject: 'Notification From Library NIFS',
                        text: 'Your Book Request has been Accepted..', 
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
})

// when user borrow book
// BorrowAcceptBook

app.post('/BorrowAcceptBook/:id', (req, res) => {
    const BookISBN = req.params.id
    // console.log(BookISBN, req.body)

    const checkBook = "SELECT * FROM book_borrow_request WHERE bookISBN = ? && borrowEmail = ? && status = ?"
    const status = "Accept"
    const borrower =  req.body.Email

    connection.query(checkBook, [BookISBN, borrower, status], (err, result) => {
        if (err) throw err

        if(result){
            const sql = "UPDATE book_borrow_request SET status = ? WHERE bookISBN = ? borrowEmail = ?"
            const status = "Borrowed"

            connection.query(sql, [status, BookISBN, borrower], (err, result) => {
                if(err) {
                    return res.json({Error: "Interal Server Error"})
                }
                else{
                    return res.json({})
                }
            })
        }
    })    
})

// all end points end

//check the server is working
app.listen(PORT, () => console.log(`Server is Running on PORT ${PORT}`));