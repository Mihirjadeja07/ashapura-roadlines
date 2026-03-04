const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();

// 1. રેલવે (Railway) પોર્ટ સેટિંગ
const PORT = process.env.PORT || 3000;

// 2. મિડલવેર (Middleware) - ફોર્મ ડેટા અને સ્ટેટિક ફાઈલો માટે
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// 3. ડેટાબેઝ કનેક્શન (Private Network)
// Railway માં તમે DATABASE_URL નામનો વેરિએબલ સેટ કર્યો છે તેનો ઉપયોગ કરશે
const db = mysql.createConnection(process.env.DATABASE_URL || {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ashapura_roadlines'
});

db.connect((err) => {
    if (err) {
        console.error('SYSTEM ERROR: Connection Failed -', err.message);
    } else {
        console.log('--- ASHAPURA SYSTEMS: DATABASE CONNECTED ---');
    }
});

// 4. હોમ રૂટ (Home Route) - તમારી ઇન્ડેક્સ ફાઈલ સર્વ કરવા માટે
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 5. ડ્રાઈવર રજીસ્ટ્રેશન રૂટ (POST Request)
app.post('/apply', (req, res) => {
    const { driver_name, wot_id } = req.body;

    // અગાઉની ભૂલ અહીં સુધારેલી છે (db.query ઉમેર્યું છે)
    const sql = 'INSERT INTO recruitment_logs (driver_name, wot_id) VALUES (?, ?)'; 
    
    db.query(sql, [driver_name, wot_id], (err, result) => {
        if (err) {
            console.error('Database Insertion Error:', err.message);
            return res.status(500).send('Critical System Error: Could not log dispatch.');
        }
        
        // ડેટા સેવ થયા પછીનું એલર્ટ
        res.send(`
            <script>
                alert('DISPATCH LOGGED: Ashapura Roadlines માં તમારું સ્વાગત છે!');
                window.location.href = '/';
            </script>
        `);
    });
});

// 6. સર્વર ચાલુ કરો
app.listen(PORT, () => {
    console.log(`\n=========================================`);
    console.log(`ASHAPURA ROADLINES LIVE: http://localhost:${PORT}`);
    console.log(`ESTABLISHED 2017 | PRECISION ENGINEERING`);
    console.log(`=========================================\n`);
});