//@desc register a user
//@route POST /api/user/register
//@access public

const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const registerUser = expressAsyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("Please enter all fields"); 
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }
    //hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password: ", hashedPassword);
    //save user to db
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`User registered successfully: ${newUser}`);
    if(newUser){
        res.status(201).json({
            "_id": newUser.id,
            "username": newUser.username,
            "email": newUser.email,
        })
    }
    else{
        res.status(400);
        throw new Error("User data is not valid.");
    }
    res.json({message : "Registered."});
});

const loginUser = expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    const user = await User.findOne({email});
    if(!user){
        res.status(401);
        throw new Error("User not found. Please register first before logging in.");
    }
    //compare password with hashed password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m",
        });
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Email or password is not valid.");
    }
    res.json({message : "Login the user"});
});

const currentUser = expressAsyncHandler(async (req, res) => {
    res.json(req.user);
});


module.exports = {registerUser, loginUser, currentUser};