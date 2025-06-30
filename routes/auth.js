const express = require ('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');

router.post('/register', async (req, res) =>{
    const {username, password, role} = req.body;
    const hashed = await bcrypt.hash(password,6);
    await pool.query('INSERT INTO users (username, password , role) VALUES ($1, $2, $3)',
        [username, hashed, role || 'user']
    );
    res.json({message: 'Success Registered'})
});

router.post('/login', async (req,res) =>{
    const {username, password} = req.body;
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if(user.rows.length ===0) return res.status(401).json({error: 'Account not found!!'});

    const valid = await bcrypt.compare(password, user.rows[0].password);
    if(!valid) return res.status(401).json({error:'Password is wrong'});

    const token = jwt.sign(
        {id:user.rows[0].id, role:user.rows[0].role},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    );
    res.json({token, role: user.rows[0].role });
})

module.exports = router;