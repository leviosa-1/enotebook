const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECERET = 'pranjal@kajal@wasgoodfriend2343'
const fetchuser = require('../middleware/fetchuser');
//Route 1:  create a user using : POST "/api/auth/createuser". Does not require Auth
router.post( "/createuser",
  [
    body("name","ENter a valid name").isLength({ min: 3 }),
    body("email","Enter a valid message").isEmail(),
    body("password","Password must be aaleast 5 character").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //if there are error, return bad req and the error
    let sucess=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({sucess, errors: errors.array() });
    }
    //check wheather user with this email  exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({sucess, error: "sorry user with this email already exists" });
      }
      const salt =await  bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password,salt);

      //create user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data ={
        user:{
          id: user.id
        }
      }

      const authToken = jwt.sign(data,JWT_SECERET);
      sucess=true;
      //console.log(jwtdata);
      res.json({sucess,authToken}); 

      //res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured!!");
    }
  }
);

//Route 2:  Authenticate user using: POST "/api/auth/login". No login req
router.post( "/login",
  [
    body("email","Enter a valid message").isEmail(),
    body("password","Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //if there are error, return bad req and the error
    let sucess = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const {email,password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error:"please try to login with correct Credentials"});
    }

    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      return res.status(400).json({sucess,error:"please try to login with correct Credentials"});
    }
    const data = {
      user:{
        id:user.id
      }
    }
    const authToken = jwt.sign(data,JWT_SECERET);
    sucess = true
    res.json({sucess,authToken});
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error occured!!");

  }
})
//Route 3 get loggedin user details using: POST "/api/auth/getuser".login required
router.post( "/getuser",fetchuser,async (req, res) => {
  try {
    user = req.user.id;
    const user = await User.findById(user).select("-password");
    res.send({user});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error occured!!");
  }

})
module.exports = router;