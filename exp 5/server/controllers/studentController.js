const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../dbs/students.db');


exports.getStudents=async (req, res) => {
  const query = 'SELECT * FROM students ORDER BY created_at DESC';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching students:', err);
      return res.status(500).json({ error: 'Failed to fetch students' });
    }
    res.json(results);
  });
}


exports.createStudent=async(req, res) => {
  const { name, roll_no } = req.body;

  if (!name || !roll_no) {
    return res.status(400).json({ error: 'Name and roll number are required' });
  }

  const query = 'INSERT INTO students (name, roll_no) VALUES (?, ?)';
  
  db.query(query, [name, roll_no], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Roll number already exists' });
      }
      console.error('Error adding student:', err);
      return res.status(500).json({ error: 'Failed to add student' });
    }
    
    res.status(201).json({
      id: result.insertId,
      name,
      roll_no,
      message: 'Student added successfully'
    });
  });
}