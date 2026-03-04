const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();

// 1. Dynamic Port: Railway provides the port via process.env.PORT
const PORT = process.env.PORT || 3000;

// 2. Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serves your images, css, js, and audio from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// 3. Database Connection Logic
// Locally, it uses your defaults. On Railway, it uses the variables you set in the dashboard.
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ashapura_roadlines',
    port: process.env.DB_PORT || 3306
});

db.connect((err) => {
    if (err) {
        console.error('DATABASE CONNECTION ERROR:', err.message);
    } else {
        console.log('--- ASHAPURA SYSTEMS: ONLINE ---');
        console.log('Database Connected Successfully');
    }
});

// 4. Routes
// Serve the main cinematic page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle the Dispatch Form submission
app.post('/apply', (req, res) => {
    const { driver_name, wot_id } = req.body;

    if (!driver_name || !wot_id) {
        return res.send(`
            <script>
                alert('System Error: Logs incomplete. Driver name and WOT ID required.');
                window.location.href = '/';
            </script>
        `);
    }

    const sql = 'INSERT INTO recruitment_logs (driver_name, wot_id) VALUES (?, ?)';
    
    db.query(sql, [driver_name, wot_id], (err, result) => {
        if (err) {
            console.error('SQL Error:', err.message);
            return res.status(500).send('Critical System Error: Could not log dispatch.');
        }

        // Return the cinematic alert after successful DB entry
        res.send(`
            <script>
                alert('DISPATCH RECEIVED: Welcome to the Ashapura Brotherhood, Driver.');
                window.location.href = '/';
            </script>
        `);
    });
});

// 5. Start Engine
app.listen(PORT, () => {
    console.log(`\n=========================================`);
    console.log(`ASHAPURA ROADLINES LIVE: http://localhost:${PORT}`);
    console.log(`=========================================\n`);
});