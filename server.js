const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

// રેલવે પોર્ટ સેટિંગ
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ડેટાબેઝ કનેક્શન
const db = mysql.createConnection(process.env.DATABASE_URL || {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ashapura_roadlines'
});

db.connect((err) => {
    if (err) console.error('DB Connection Error: ' + err.message);
    else console.log('--- ASHAPURA SYSTEMS: DATABASE CONNECTED ---');
});

// હોમ રૂટ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ડેટા સેવ કરવાનો રૂટ
app.post('/apply', (req, res) => {
    const { driver_name, wot_id } = req.body;
    
    // આજની તારીખ (YYYY-MM-DD) મેળવવા માટે
    const today = new Date().toISOString().split('T')[0];

    // SQL ક્વેરી - ટેબલમાં 'created_at' કોલમમાં તારીખ જશે
    const sql = 'INSERT INTO recruitment_logs (driver_name, wot_id, created_at) VALUES (?, ?, ?)'; 
    
    db.query(sql, [driver_name, wot_id, today], (err, result) => {
        if (err) {
            console.error('Database Insertion Error:', err.message);
            return res.status(500).send('Critical System Error: Could not log dispatch.');
        }
        res.send("<script>alert('Log Submitted Successfully!'); window.location.href='/';</script>");
    });
});

app.listen(PORT, () => console.log('Ashapura Server Live on Port ' + PORT));