//MIDDLEWARE TO VALIDATE TOKEN


const express = require("express");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");

const validateToken = expressAsyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.status(401);
                throw new Error("User not authorized, token failed.");
            }
            req.user = decoded.user;
            next();
        });
        if(!token){
            res.status(401);
            throw new Error("User not authorized or no token in request.");
        }   
    }
});
    

module.exports = validateToken;
