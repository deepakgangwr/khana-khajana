const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt  = require('bcrypt');
var jwt = require('jsonwebtoken');
const jwtSecret = "HaHa"

router.post("/createuser", [
    body('email','must contain @gmail.com').isEmail(),
    body('name','name must be at least 5 characters long').isLength({ min: 4 }),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await User.create({
            name: req.body.name,
            password: req.body.password, 
            email: req.body.email,
            address: req.body.address,
        });
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});


router.post('/loginUser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }).withMessage('should contain min 5 char'),
], async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    try {
        let email=req.body.email;
        let userData = await User.findOne({email});
        if (!userData) {
            return res.status(400).json({ errors: 'Email not found! Enter correct email' });
        }
        const pwdCompare= await bcrypt.compare(req.body.password, userData.password);
        if (!pwdCompare) {
            return res.status(400).json({ errors: 'Incorrect Password!' });
        }
        const data= {
            user:{
                id:userData.id
            }
        };
        const authToken=jwt.sign(data, jwtSecret);
        return res.json({ success: true , authToken: authToken});
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }

});

router.post('/foodData', async (req, res)=>{
    try{
        // console.log(global.food_items);
        res.send([global.food_items, global.foodCategory]);
    }
    catch(error){
        console.error(error.message);
        res.send("Server error!");
    }
})

module.exports = router;
