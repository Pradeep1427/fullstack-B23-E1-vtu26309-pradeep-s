const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
// load environment variables from .env file
require('dotenv').config();

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'virat'
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected");
});

app.get('/students', (req, res) => {
    db.query("SELECT * FROM students", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});