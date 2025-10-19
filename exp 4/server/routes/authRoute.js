const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const router = express.Router();
// const db=new require('../dbs/users.db')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./dbs/users.db');
const {registerUser,loginUser}=require('../controllers/authController')


router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports=router