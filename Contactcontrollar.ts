import { Request,Response } from "express";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { IContact } from "../models/IContact";
import {APP_STATUS} from "../constants/Constant";
import ContactTable from "../database/schema/ContactSchema";

export const GetAllContact  = async (req:Request,Res:Response) => {
    try {
        let contacts: IContact[] | undefined = await ContactTable.find(); // select * from contacts;
        if (contacts) {
            return Res.status(200).json(contacts);
        }
        } catch (error: any) {
            return Res.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
            });
        }
}
export const CreateContact  = async (request:Request,response:Response) => {
    try {
        // read the form data
        let {name, imageUrl, email, mobile, company, title, groupId} = request.body;
        // check if the mobile exists
        let contact = await ContactTable.findOne({mobile: mobile});
        if (contact) {
            return response.status(400).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: "Mobile number is already exists"
        });
    }
 // create
    let theContactObj: IContact = {
        name: name,
        imageUrl: imageUrl,
        email: email,
        mobile: mobile,
        company: company,
        title: title,
        groupid: groupId
    }
    theContactObj = await new ContactTable(theContactObj).save();
    if (theContactObj) {
        return response.status(200).json(theContactObj);
    }
    } catch (error: any) {
        return response.status(500).json({
        status: APP_STATUS.FAILED,
        data: null,
        error: error.message
        });
 
    }
}
export const GetContact  = async (req:Request,Res:Response) => {
    try {
        let {contactId} = req.params;
        if (contactId) {
        const mongoContactId = new mongoose.Types.ObjectId(contactId); // string -> mongo id
        const contact: IContact | undefined | null = await ContactTable.findById(mongoContactId);
    if (!contact) {
        return Res.status(404).json({
        status: APP_STATUS.FAILED,
        data: null,
        error: "No Contact found"
        });
    }
    return Res.status(200).json(contact);
    }
    } catch (error: any) {
        return Res.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
            });
        }
    }
/**
@usage : Update a contact
@method : PUT
@params : name, imageUrl, email, mobile, company, title, groupId
@url : http://localhost:9000/contacts/:contactId
 */
export const updateContact = async (request: Request, response:
    Response) => {
        const {contactId} = request.params;
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({errors:
            errors.array()});
        }
        try {
        // read the form data
        let {name, imageUrl, email, mobile, company, title,groupId} = request.body;
        // check if the contact exists
        const mongoContactId = new mongoose.Types.ObjectId(contactId);
        let contact: IContact | null | undefined = await ContactTable.findById(mongoContactId);
        if (!contact) {
            return response.status(404).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: "Contact is not found"
            });
        }
        // update
        let theContactObj: IContact | null = {
            name: name,
            imageUrl: imageUrl,
            email: email,
            mobile: mobile,
            company: company,
            title: title,
            groupid: groupId
        }
        theContactObj = await ContactTable.findByIdAndUpdate(mongoContactId, {
            $set: theContactObj
        }, {new: true})
        if (theContactObj) {
            return response.status(200).json(theContactObj);
        }
        } catch (error: any) {
            return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
            });
        }
    }
    /**
@usage : Delete a contact
@method : DELETE
@params : no-params
@url : http://localhost:9000/contacts/:contactId
 */
export const deleteContact = async (request: Request, response: Response) => {
        try {
            let {contactId} = request.params;
            if (contactId) {
        
        const mongoContactId = new mongoose.Types.ObjectId(contactId); // string -> mongo id
        const contact: IContact | undefined | null = await ContactTable.findById(mongoContactId);
        
        if (!contact) {
            return response.status(404).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: "No Contact found"
            });
        }
        let theContact: IContact | null = await ContactTable.findByIdAndDelete(mongoContactId);
        if (theContact) {
                return response.status(200).json({});
        }
        }
        } catch (error: any) {
            return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
            });
        }
    }