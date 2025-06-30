const express = require('express');
const router = express.Router();
const {authenticate, isAdmin } = require ('../middleware/authMiddleware');
const pool = require('../db');

router.get('/all', authenticate, isAdmin, async(req, res) =>{
    const result = await pool.query('SELECT id, username, role FROM users');
    res.json(res.rows);
})

module.exports = router;