import { Request, Response } from "express";
import mongoose from "mongoose";
import { IUser } from "../models/IUser";
import UserTable from "../database/schema/userschema";
import { APP_STATUS } from "../constants/Constant";
import bcryptjs from "bcryptjs"


import { validationResult } from "express-validator";

export const createuser = async (req: Request, res: Response) => {
  // const error = validationResult(req);
  // if (!error.isEmpty()) {
  //   res.status(200).json({
  //     error: error.array(),
  //   });
  // }
  try {
    let {
      Users_id,
      name,
      email,
      address1,
      phone,
      street,
      city,
      state,
      pincode,
      password
    } = req.body;

    // console.log(req.body);


    //password encryption
    const salt=await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password,salt);
    let theuserobj: IUser = {
      Users_id: Users_id,
      name: name,
      email: email,
      address1: address1,
      phone: phone,
      street: street,
      city: city,
      password:hashPassword,
      state: state,
      pincode: pincode,
    };
    console.log(theuserobj);
    theuserobj = await new UserTable(theuserobj).save();
    if (theuserobj) {
      return res.status(200).json(theuserobj);
    }
  } catch (error: any) {
    return res.status(500).json({
      status: APP_STATUS.FAILED,
      data: null,
      error: error.message,
    });
  }
};
