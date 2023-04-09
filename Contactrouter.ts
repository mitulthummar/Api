import { Request,Response, Router } from "express";
import *as Contactcontrollar from "../controllar/Contactcontrollar"
import { body } from "express-validator";

const Contactrouter:Router = Router();

/**
 * @usage : to get all Contacts
 * @method : get
 * @param:no - params
 * @url:http//localhost:9000/contacts
 */
Contactrouter.get("/",[]),async(req:Request,res:Response)=>{
    await Contactcontrollar.GetAllContact(req,res);
};
/**
@usage : get a contact
@method : GET
@params : no-params
@url : http://localhost:9000/contacts/:contactId
 */
Contactrouter.get("/:contactId", async (request: Request,
    response: Response) => {
     await Contactcontrollar.GetContact(request, response);
    });
/**
@usage : create a contact
@method : POST
@params : name, imageUrl, email, mobile, company, title, groupId
@url :http://localhost:9000/contacts
 */
Contactrouter.post("/",[
    body('name').not().isEmpty().withMessage("Name is Required"),
    body('imageUrl').not().isEmpty().withMessage("imageUrl isRequired"),
    body('email').not().isEmpty().withMessage("email isRequired"),
    body('mobile').not().isEmpty().withMessage("mobile isRequired"),
    body('company').not().isEmpty().withMessage("company isRequired"),
    body('title').not().isEmpty().withMessage("title isRequired"),
    body('groupId').not().isEmpty().withMessage("groupId isRequired"),
   ],async(req:Request,res:Response) => {
    await Contactcontrollar.CreateContact(req,res);
    console.log(req.body)
})
/**
@usage : Update a contact
@method : PUT
@params : name, imageUrl, email, mobile, company, title, groupId
@url :http://localhost:9002/contacts/:contactId
*/
Contactrouter.put("/:ContactId",[body('name').not().isEmpty().withMessage("Name is Required"),
    body('imageUrl').not().isEmpty().withMessage("imageUrl isRequired"),
    body('email').not().isEmpty().withMessage("email isRequired"),
    body('mobile').not().isEmpty().withMessage("mobile isRequired"),
    body('company').not().isEmpty().withMessage("company isRequired"),
    body('title').not().isEmpty().withMessage("title isRequired"),
    body('groupId').not().isEmpty().withMessage("groupId isRequired"),
    ],async(req:Request,res:Response) => {
    await Contactcontrollar.GetContact(req,res);
})
/**
@usage : Delete a contact
@method : DELETE
@params : no-params
@url : http://localhost:9000/contacts/:contactId
 */
Contactrouter.delete("/:contactId", async (request: Request,
    response: Response) => {
     await Contactcontrollar.deleteContact(request, response);
    });

export default Contactrouter;