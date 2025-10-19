const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./dbs/users.db');

exports.registerUser=async (req, res) => {
    const { username, password, age, gender, dob } = req.body;

    // Validation
    if (!username || !password || !age || !gender || !dob) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const sql = `INSERT INTO users (username, password, age, gender, dob) VALUES (?, ?, ?, ?, ?)`;
        
        db.run(sql, [username, hashedPassword, age, gender, dob], function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(409).json({ error: 'Username already exists' });
                }
                return res.status(500).json({ error: 'Database error' });
            }
            
            res.status(201).json({ 
                message: 'User registered successfully',
                userId: this.lastID 
            });
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.loginUser=async(req, res) => {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find user in database
    const sql = `SELECT * FROM users WHERE username = ?`;
    
    db.get(sql, [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        try {
            // Compare passwords
            const match = await bcrypt.compare(password, user.password);
            
            if (match) {
                res.json({ 
                    message: 'Login successful',
                    user: {
                        id: user.id,
                        username: user.username,
                        age: user.age,
                        gender: user.gender,
                        dob: user.dob
                    }
                });
            } else {
                res.status(401).json({ error: 'Invalid username or password' });
            }
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Server error' });
        }
    });
}