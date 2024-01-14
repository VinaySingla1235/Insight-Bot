import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { errorHandler } from "../utils/errors.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK, users", users });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const users = await User.find();
    // return res.status(200).json({ message: "OK, users", users });
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) return next(errorHandler(401, "User already registered"));
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({message:"OK"})
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(401, "User not registered"));
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(errorHandler(403, "Incorrect password"));
    }
    res.clearCookie(COOKIE_NAME,{
        path: "/",
        domain: "localhost",
        httpOnly: true,
        signed: true,
      });
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });
    res.status(200).json({message:"OK",name:user.name,email:user.email})
  } catch (error) {
    next(error);
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
     console.log("verifying user");
    //  console.log(res.locals.jwtData)
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return next(errorHandler(401, "User not registered or malfunctioned"));
    }
    if(user._id.toString()!==res.locals.jwtData.id){
      return next(errorHandler(401,"Permissions didn't match"));
    }
  
    res.status(200).json({message:"OK",name:user.name,email:user.email})
  } catch (error) {
    console.log(error)
    next(error);
  }
};
export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //  console.log("verifying user");
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return next(errorHandler(401, "User not registered or malfunctioned"));
    }
    if(user._id.toString()!==res.locals.jwtData.id){
      return next(errorHandler(401,"Permissions didn't match"));
    }
    res.clearCookie(COOKIE_NAME,{
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });
    res.status(200).json({message:"OK"})
  } catch (error) {
    next(error);
  }
};

