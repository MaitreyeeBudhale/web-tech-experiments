const express = require('express');
const cors = require('cors');
const router = express.Router();
const {getStudents,createStudent}=require('../controllers/studentController')

router.post('/students',getStudents)
router.get('/students',createStudent)
module.exports=router