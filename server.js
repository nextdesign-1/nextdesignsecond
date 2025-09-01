const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const e = require('express');
const cors = require('cors');

const url = "https://nextdesignwebsite.com"; // https://nextdesignwebsite.com   

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
db.query('SELECT 1', (err, results) => {
    if (err) console.error('Error running query:', err);
    else console.log('Database is working');
});

app.use(cors({
    origin: url, // GitHub Pages root domain
    credentials: true
}));

app.use(express.static('docs'));

////////////////////////// REUSABLE FUNCTIONS LOGIC ///////////////////////////
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
    }
});
function sendClientEmail(userEmail, date, time, email, message){
    const mailOptions = {
        from: process.env.EMAIL_USER,  // Sender address
        to: userEmail,                 // Receiver's email
        subject: 'New Booking', // Subject line
        text: `Hello, a call was booked with NextDesign for: ${date}, ${time}\n\nEmail: ${email}\n\nMessage: ${message}`,
    };
  
    // Send mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Verification email sent:', info.response);
        }
    });
}
function sendUserEmail(userEmail, date, time, link) {  
    const mailOptions = {
        from: process.env.EMAIL_USER,  // Sender address
        to: userEmail,                 // Receiver's email
        subject: 'Booking Confirmed', // Subject line
        text: `Hello, you booked a call with NextDesign for ${date}, ${time}\n\nCancel anytime with this link: ${link}`,
    };
  
    // Send mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Verification email sent:', info.response);
        }
    });
}
function sendUserDelete(userEmail) {  
    const mailOptions = {
        from: process.env.EMAIL_USER,  // Sender address
        to: userEmail,                 // Receiver's email
        subject: 'Booking Requested', // Subject line
        text: `Hello, your booking for NextDesign has been cancelled. Please rebook at your convenience.`,
    };
  
    // Send mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Verification email sent:', info.response);
        }
    });
}
function isValidEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function generateNumber(){
    return crypto.randomBytes(5).toString('hex'); 
}
function requireAdmin(req, res, next){
    const code = req.query.code;
    if(code != process.env.ADMIN_CODE) {
        console.log("admin fail");
        return res.json({ message: 'failure' });
    }
    next();
}
///////////////////////////////////////////////////////////////////////////////

////////////////////////// APIS ROUTES //////////////////////////
app.post("/api/book-appointment", (req, res) => {
    const date = req.body.date;
    const time = req.body.time;
    const email = req.body.email;
    const message = req.body.message;
    const type = req.body.type;

    if(!isValidEmail(email)){
        return res.json({ message: 'Failure' });
    }

    const cancelCode = generateNumber();
    const cancelLink = url + "/?cancel=" + cancelCode;

    const insertQuery = "insert into bookings (booking_date, booking_time, email, message, booking_type, cancel_code) values (?, ?, ?, ?, ?, ?)";
    db.query(insertQuery, [date, time, email, message, type, cancelCode], (err, result) => {
        if(err){
            console.error("Error updating booking: ", err);
            return res.json({ message: 'Failure' });
        }

        sendClientEmail("info@nextdesignwebsite.com", date, time, email, message);
        sendClientEmail("jackbaileywoods@gmail.com", date, time, email, message);
        sendUserEmail(email, date, time, cancelLink);
        return res.json({ message: 'success' });
    });
});

app.post("/api/get-bookings", (req, res) => {
    let likeStr;
    if(req.body.month < 10){
        likeStr = "%" + req.body.year + "-0" + String(req.body.month) + "%";
    } else {
        likeStr = "%" + req.body.year + "-" + String(req.body.month) + "%";
    }


    const getBookingsQuery = "select * from bookings where booking_date like ?";
    db.query(getBookingsQuery, [likeStr], (err, result) => {
        if(err){
            console.error("Error getting bookings: " + err);
            return res.json({ bookings: [] });
        }

        return res.json({ bookings: result });
    });
});

app.post("/api/extra-slots", (req, res) => {
    const date = req.body.date;

    const getExtraSlots = "select * from extra_slots where booking_date = ?";
    db.query(getExtraSlots, [date], (err, result) => {
        if(err){
            console.error("Error getting extra slots: " + err);
        }

        return res.json({ slots: result });
    });
});

app.post("/api/check-slots", (req, res) => {
    const date = req.body.date;

    const checkQuery = "select * from bookings where booking_date = ?";
    db.query(checkQuery, [date], (err, result) => {
        if(err){
            console.error("Error checking bookings: " + err);
        }

        let timesTaken = "";
        if(result.length > 0){
            result.forEach((row, idx) => {
                if(idx > 0){
                    timesTaken += ",," + row.booking_time.slice(0, 5);
                } else {
                    timesTaken = row.booking_time.slice(0, 5);
                }
            }); 
            return res.json({ message: 'success', times: timesTaken });
        } else {
            return res.json({ message: 'success', times: timesTaken});
        }
    });
});

app.get("/api/admin-code", requireAdmin, (req, res) => {
    return res.json({ message: 'success' });
});

app.post("/api/close-all", requireAdmin, (req, res) => {
    const date = req.body.date;
    const times = req.body.times;

    const getEmailsQuery = "select * from bookings where booking_date = ?";
    db.query(getEmailsQuery, [date], (err, result) => {
        if(err){
            console.error("Error fetching bookings: " + err);
        }

        if(result.length > 0){
            let allStr = "";
            result.forEach(obj => {
                if(!allStr.includes(obj.email)){
                    allStr += obj.email;
                    sendUserDelete(obj.email);
                }
            });
        }

        const deleteAllQuery = "delete from bookings where booking_date = ?";
        db.query(deleteAllQuery, [date], (err, result) => {
            if(err){
                console.error("Error deleting existing bookings: " + err);
            }

            let values = [];
            for(let i = 0; i < times.length; i++){
                values.push([times[i], date, "marceauowen@gmail.com", "Not entered", "admin", "n/a"]);
            }
            const closeQuery = "insert into bookings (booking_time, booking_date, email, message, booking_type, cancel_code) values ?";
            db.query(closeQuery, [values], (err, result) => {
                if(err){
                    console.error("Error inserting fake bookings: " + err);
                }

                return res.json({ message: 'success' });
            });
        });    
    });
});

app.post("/api/open-day", requireAdmin, (req, res) => {
    const date = req.body.date;

    const openQuery = "delete from bookings where booking_date = ?";
    db.query(openQuery, [date], (err, result) => {
        if(err){
            console.error("Error opening day: " + err);
        }

        return res.json({ message: 'success' });
    });
});

app.post("/api/show-bookings", requireAdmin, (req, res) => {
    const date = req.body.date;

    const getBookingsQuery = "select * from bookings where booking_date = ? and booking_type = ?";
    db.query(getBookingsQuery, [date, "user"], (err, result) => {
        if(err){
            console.error("Error getting bookings: " + err);
        }

        return res.json({ message: 'success', arrayObjs: result });
    });
});

app.post("/api/verify-cancel", (req, res) => {
    const code = req.body.code;

    const checkQuery = "select * from bookings where cancel_code = ?";
    db.query(checkQuery, [code], (err, result) => {
        if(err){
            console.error("Error getting cancel code: " + err);
        }

        if(result.length == 0){
            return res.json({ message: 'Failure' });
        } else {
            return res.json({ message: 'Success' });
        }
    });
});

app.post("/api/delete-booking", (req, res) => {
    const code = req.body.code;

    const deleteQuery = "delete from bookings where cancel_code = ?";
    db.query(deleteQuery, [code], (err, result) => {
        if(err){
            console.error("Error deleting bookings: " + err);
        }

        db.query("select * from bookings where cancel_code = ?", [code], (err, result) => {
            if(err){
                console.error("Error selecting *: " + err);
            }

            if(result.length == 1){
                sendUserDelete(result[0].email);
            }
            return res.json({ message: 'success' });
        });
    });
});

app.post("/api/remove-slot", requireAdmin, (req, res) => {
    const date = req.body.date; 
    const time = req.body.time; 

    const values = [time, date, "marceauowen@gmail.com", "Not entered", "admin", "n/a"];
    const closeQuery = "insert into bookings (booking_time, booking_date, email, message, booking_type, cancel_code) values (?, ?, ?, ?, ?, ?)";
    db.query(closeQuery, values, (err, result) => {
        if(err){
            console.error("Error removing slot: " + err);
            return res.json({ message: 'failure' });
        }

        return res.json({ message: 'success' });
    });
});

app.post("/api/create-slot", requireAdmin, (req, res) => {
    const date = req.body.date;
    const time = req.body.time;

    const insertQuery = "insert into extra_slots (booking_date, booking_time) values (?, ?)";
    db.query(insertQuery, [date, time], (err, result) => {
        if(err){
            console.error("Error inserting extra slot: " + err);
            return res.json({ message: 'failure' });
        }

        return res.json({ message: 'success' });
    });
});
/////////////////////////////////////////////////////////////////


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});