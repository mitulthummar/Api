import { Router, Request, Response } from "express";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
// import * as usercontroller from "../Controller/usercontroller";
import * as usercontroller from "../controllar/usercontroller"

const userrouter: Router = Router();

userrouter.post("/register",
  [
    body("name").not().isEmpty().withMessage("Name is Required"),
    body("email").not().isEmpty().withMessage("email isRequired"),
  ],
  async (req: Request, res: Response) => {
    await usercontroller.createuser(req, res);
  }
);
// userrouter.post("/",[]),async(req:Request,res:Response)=>{

// };
userrouter.put("/.", []), async (req: Request, res: Response) => {};
userrouter.delete("/.", []), async (req: Request, res: Response) => {};

export default userrouter;
