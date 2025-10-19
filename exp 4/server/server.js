const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

const authRoute = require('./routes/authRoute');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// database connection
const db=new sqlite3.Database('./dbs/users.db',(err)=>{
    if(err){
        console.log('error connectind database: ',err)
    }
    else{
        console.log('database connected')
        createTable()
    }
})
const createTable=()=>{
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            age INTEGER NOT NULL,
            gender TEXT NOT NULL,
            dob TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;
    
    db.run(sql, (err) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Users table ready');
        }
    });
}

// routes
app.use('/api/auth',authRoute)
app.get('/api/users', (req, res) => {
    const sql = `SELECT id, username, age, gender, dob, created_at FROM users`;
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ users: rows });
    });
});

// start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});