const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Railway Private Network કનેક્શન
const db = mysql.createConnection(process.env.DATABASE_URL || {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ashapura_roadlines'
});

db.connect((err) => {
    if (err) console.error('Error: ' + err.message);
    else console.log('Ashapura DB Connected!');
});

app.post('/apply', (req, res) => {
    const { driver_name, wot_id } = req.body;
    db.query('INSERT INTO recruitment_logs (driver_name, wot_id) VALUES (?, ?)', 
    [driver_name, wot_id], (err) => {
        if (err) return res.status(500).send('Error');
        res.send("<script>alert('Log Submitted!'); window.location.href='/';</script>");
    });
});

app.listen(PORT, () => console.log('Running on ' + PORT));