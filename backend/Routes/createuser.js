const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
require('dotenv').config();
const bcrypt = require('bcrypt')
const router = express.Router();
var jwt = require('jsonwebtoken');
const jwtSecret = "HaHa"


// Route to create a new user
router.post("/createuser", [
  body('email', 'Invalid email format').isEmail(),
  body('name', 'Name must be at least 4 characters long').isLength({ min: 4 }),
  body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    
  }
     console.log(req.body)
    // let user = await User.findOne({email:req.body.email})
    try {
    const salt = await bcrypt.genSalt(5)
    let securePass = await bcrypt.hash(req.body.password, salt);
    await User.create({
      name: req.body.name,
       // password: req.body.password,  first write this and then use bcryptjs
       password: securePass,
      email: req.body.email,
      address: req.body.address,
    });
    res.json({ success: true });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, error: 'Error creating user' });
  }
});


// Route to signin
router.post('/loginuser', [
  body('email', "Enter a Valid Email").isEmail(),
  body('password', "Password cannot be blank").exists(),
], async (req, res) => {
  let success = false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body;

  try {
      let user = await User.findOne({ email });  //{email:email} === {email}
      if (!user) {
          return res.status(400).json({ success, error: "Enter correct email" });
      }

      const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
      if (!pwdCompare) {
          return res.status(400).json({ success, error: "Enter correct password"});
      }
      const data = {
          user: {
              id: user.id
          }
      }
      success = true;
      const authToken = jwt.sign(data, jwtSecret);
      res.json({ success, authToken })


  } catch (error) {
      console.error(error.message)
      res.send("Server Error")
  }
})

router.post('/foodData', async (req, res) => {
  try {
      // console.log( JSON.stringify(global.foodData))
      // const userId = req.user.id;
      // await database.listCollections({name:"food_items"}).find({});
      res.send([global.food_items, global.foodcategory])
  } catch (error) {
      console.error(error.message)
      res.send("Server Error")

  }
})

module.exports = router;
