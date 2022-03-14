import { Request, Response } from "express";
import { check, validationResult } from "express-validator";

export const index = (req: Request, res: Response) => {
    res.render("home", {
        title: "Homes"
    });
};

export const sendEmail = async (req: Request, res: Response) => {
  try {
    await check("email", "Email is not valid").isEmail().run(req);
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
    }

    const { ...args } = req.body;

    const randomNumber = () => Math.floor((Math.random() * 1000) + 1);

    if (args.date){
       args.date = await args.date.reduce((a:string[], i:number) => ({ ...a, [i]: randomNumber()}), {}); 
    } else {
        throw new Error("Date is not valid");
    }

    const total = Object.values(args.date).reduce((a:number, i:number) => a + i );
    args.mean= Number(total) / Object.values(args.date).length ;

    //log results on the console as stringified json
    console.log(JSON.stringify(args, null, 2));

    return res.status(200).json(args);
  }
  catch(err){
      console.log(err);
      return res.status(500).json({ err: "Ooops something went wrong" });
  }
};
