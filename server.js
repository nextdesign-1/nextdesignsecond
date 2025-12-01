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

const url = process.env.FRONTEND_URL; // https://nextdesignwebsite.com   http://localhost:3000

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
async function sendEmail(userEmail, text) {
    const dataToSend = { reciever: userEmail, text: text, service: 'nextdesign' };
    try {
        const response = await fetch('https://email-sender-lkex.vercel.app/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(dataToSend), 
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData.error);
            return;
        }
    } catch (error) {
        console.error('Error posting data:', error);
    }
}
function sendClientEmail(userEmail, date, time, email, message){
    sendEmail(userEmail, `<p>Hello, a call was booked with NextDesign for: ${date}, ${time}\n\nEmail: ${email}\n\nMessage: ${message}</p>`);
}
function sendClientDelete(userEmail, date, time){
    sendEmail(userEmail, `<p>Hello, a booking was cancelled with NextDesign for: ${date}, ${time}.</p>`);
}
function sendUserEmail(userEmail, date, time, link) {  
    sendEmail(userEmail, `<p>Hello, you booked a call with NextDesign for ${date}, ${time}\n\nCancel anytime with this link: ${link}</p>`);
}
function sendUserDelete(userEmail) {
    sendEmail(userEmail, `<p>Hello, your booking for NextDesign has been cancelled. Please rebook at your convenience.</p>`);
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



////////////////////////// APIS ROUTES //////////////////////////
app.post("/api/book-appointment", (req, res) => {
    const date = req.body.date;
    const time = req.body.time;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;
    const type = req.body.type;

    if(!isValidEmail(email)){
        return res.json({ message: 'Failure' });
    }

    const cancelCode = generateNumber();
    const cancelLink = url + "/?cancel=" + cancelCode;

    const insertQuery = "insert into bookings (booking_date, booking_time, email, phone_number, message, booking_type, cancel_code) values (?, ?, ?, ?, ?, ?, ?)";
    db.query(insertQuery, [date, time.replace(/ /g, ""), email, phone, message, type, cancelCode], (err, result) => {
        if(err){
            console.error("Error updating booking: ", err);
            return res.json({ message: 'Failure' });
        }

        sendClientEmail(process.env.ADMIN_EMAIL, date, time, email, message);
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
            let times = [
                "07:00", "07:30",
                "08:00", "08:30",
                "09:00", "09:30",
                "10:00", "10:30",
                "11:00", "11:30",
                "12:00", "12:30",
                "13:00", "13:30",
                "14:00", "14:30",
                "15:00", "15:30",
                "16:00", "16:30",
                "17:00", "17:30",
                "18:00", "18:30",
                "19:00", "19:30",
                "20:00", "20:30",
                "21:00", "21:30",
                "22:00", "22:30",
                "23:00", "23:30"
            ];
            for(let i = 0; i < 34; i++){
                values.push([times[i].replace(/ /g, ""), date, "marceauowen@gmail.com", "Not entered", "admin", "n/a"]);
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
                sendClientDelete(process.env.ADMIN_EMAIL, result[0].booking_date, result[0].booking_time);
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

app.post("/api/open-slot", requireAdmin, (req, res) => {
    const id = req.body.id;

    const openSlotQuery = "delete from bookings where id = ?";
    db.query(openSlotQuery, [id], (err, result) => {
        if(err){
            console.error("Error opening slot: " + err);
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



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});