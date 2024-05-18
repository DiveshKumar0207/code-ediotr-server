import fs from "fs";
import { Response, Request, Errback, NextFunction } from "express";
import { query, matchedData, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import userModel from "../db/models/user.model";

const privateKey = fs.readFileSync('private.pem', 'utf8');

const generateAccessToken = (payload : any)=>{
    return jwt.sign(
        payload,
        privateKey,
        {
            algorithm: "ES256"
        }
    ) 
}

// Signup controller on route /api/signup/
const signUp =async (req:Request, res: Response, next : NextFunction)=>{
    // validation err
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({erros: errors.array()});
    }
    //  get validated data 
    const validatedData = matchedData(req);

    try{
        const {name, email, password} = validatedData;

        const isUserExisted = await userModel.findOne({email});
        if(isUserExisted){
            return res.status(400).json({message : "Email already exist"});
        }

        const newUser = new userModel({
            name,
            email,
            password,
        });

        const userCreated = await newUser.save();

        const payload = {
            userId : userCreated._id,
            email : userCreated.email,
        }

        const jwtToken = generateAccessToken(payload);

        res.status(201).json({message: "User created", accessToken: jwtToken})

    }catch(err){
        // Pass the error to the error handling middleware
        next(err);  
    }

};


// Login controller on route /api/login/
const login = async (req:Request, res: Response, next: NextFunction)=>{
     // validation err
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array});
    }

    const validatedData = matchedData(req);

    try {
    
        const {email, password} = validatedData;

        const isUserExisted = await userModel.findOne({email});
        if(!isUserExisted){
            return res.status(401).json({message: "Incorrect email or password"});
        }

        const isValidUser = await bcrypt.compare(password, isUserExisted.password);
        if(!isValidUser){
            return res.status(401).json({message : "Incorrect email or password"});
        }

        const payload = {
            userId : isUserExisted._id,
            email : isUserExisted.email,
        }

        const jwtToken = generateAccessToken(payload);

        res.status(200).json({message: "Authorized", accessToken: jwtToken});   
        
    } catch (err) {
        // Pass the error to the error handling middleware
        next(err);
    }

}
 

export {signUp, login};