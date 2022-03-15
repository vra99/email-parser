import { Request, Response } from "express";
import { parseEmail } from "../util/parseEmail";

export const index = async (req: Request, res: Response) => {
  try {
    const dummyEmail = "From:<sender@example.com>\r\n"+
        "To: 'Receiver Name' <receiver@example.com>\r\n"+
        "Subject: Hello world!\r\n"+
        "\r\n"+
        "10 May 2021: 9.130, 11 May 2021: 12500, 12 May 2021: 140.25";

    const results = await parseEmail(dummyEmail);

    //log results on terminal as json
    console.log(JSON.stringify(results));

    return res.status(200).json(results);
  } catch(err){
    console.log(err);
    return res.status(500).json({err});
  }
};
