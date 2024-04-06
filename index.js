const express = require("express");
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
// const path = require('path');
// import  express from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import dotenv from 'dotenv'
const app = express();
dotenv.config();

//mongoose.connect(process.env.MONGO).then(()=>console.log("MongoDB connected")).catch((e)=>console.log(e))
mongoose.connect("mongodb+srv://dhruv8348:1234@cluster0.2uozfdm.mongodb.net/")
.then(()=>console.log("MongoDB Connected"))
.catch((e)=>console.log(e))

// registration Schema
const registrationSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

// model of registration Schema
const Registration = mongoose.model("registration",registrationSchema);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(express.static('pages'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname +'Task 1/pages/index.html')
});

app.post("/register",async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const existingUser = await Registration.findOne({email:email});
        if (!existingUser){
            const registrationData=new Registration({
                name,
                email,
                password
            });
            await registrationData.save();
            res.redirect("/success");
        }
        else{
            console.log("User already exist");
            express.redirect("/error");
        }
    }
    catch (error){
        console.log("error");
        res.redirect("/error");
    }
});

app.get("/success",(req,res)=>{
    res.sendFile(__dirname+"/pages/success.html")
});
app.get("/error",(req,res)=>{
    res.sendFile(__dirname + "/pages/error.html" )
});
app.listen(5000, ()=>{
    console.log(`Server is up on running`);
});