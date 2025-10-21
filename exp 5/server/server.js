const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const studentRoute = require('./routes/studentRoute');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure consistent working directory
process.chdir(__dirname);

// Database setup
const dbDir = path.resolve(__dirname, 'dbs');

// Ensure db folder exists
if (!fs.existsSync(dbDir)) {
  console.log('🪄 Creating folder:', dbDir);
  fs.mkdirSync(dbDir, { recursive: true });
}

// Create absolute and normalized path
const dbPath = path.join(dbDir, 'students.db');
const normalizedPath = dbPath.replace(/\\/g, '/');

console.log('📂 Using DB path:', normalizedPath);

// Open the database (create if doesn’t exist)
const db = new sqlite3.Database(
  normalizedPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error('❌ Database error:', err.message);
    } else {
      console.log('✅ Database connected successfully!');
      createTable();
    }
  }
);

// Table creation function
function createTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      roll_no TEXT NOT NULL UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;
  db.run(sql, (err) => {
    if (err) {
      console.error('❌ Error creating table:', err.message);
    } else {
      console.log('🎓 Students table ready!');
    }
  });
}

// Routes
app.use('/api', studentRoute);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
