import { Router , Request, Response } from "express";
import *as groupControllar from "../controllar/groupControllar" 
import { body } from "express-validator";

const groupRouter : Router = Router();

/**
 * @usage : to get all groups
 * @method : get
 * @param:no - params
 * @url:http//localhost:9000/groups
 */
// groupRouter.get("/",(req:Request,res:Response)=>{
//     console.log("getAllGroup")
// })

groupRouter.get("/getall",[
]),async(req:Request,res:Response)=>{
    console.log("getAllGroups")
    await groupControllar.getAllGroups(req,res);
};
/**
 * @usage : create group
 * @method : post
 * @param:no - params
 * @url:http//localhost:9000/groups
 */
groupRouter.post("/",[
    body('name').not().isEmpty().withMessage("Name is Required")
        ],async(req:Request,res:Response) => {
            await groupControllar.createGroup(req,res);
        })
groupRouter.put("/:groupid",[
    body('name').not().isEmpty().withMessage("Name is Required")
        ],async(req:Request,res:Response) => {
            await groupControllar.createGroup(req,res);
        })
/**
 * @usage : to getgroup
 * @method : get
 * @param:no - params
 * @url:http//localhost:9000/groups/`
 */
groupRouter.get("/:groupsid",[],async(req:Request,res:Response) => {
    await groupControllar.getGroup(req,res);
    console.log(req.body)
})
export default groupRouter;