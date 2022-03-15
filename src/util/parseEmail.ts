import { check, validationResult } from "express-validator";
import { simpleParser } from "mailparser";
import moment from "moment";

export const parseEmail = async (email: string) => {
  try {
        const parsed = await simpleParser(email);
        const { text, from } = parsed;
        let values : any;

        if(text){
            //transform raw text into object;
            let jsonStrig = "{";
                const items = text.split(",");
                for (let i = 0; i < items.length; i++) {
                    const current = items[i].split(":");
                    jsonStrig += "\"" + current[0] + "\":\"" + current[1] + "\",";
                }
            jsonStrig = jsonStrig.substr(0, jsonStrig.length - 1);
            jsonStrig += "}";
            values = JSON.parse(jsonStrig);

            //modify date format from the object keys
            for (const [ key ] of Object.entries(values)) {
                const newKey= await moment(key).format("YYYY/MM/DD");
                values[newKey]=values[key];
                delete values[key];
            }
        } else {
            return "No text found";
        }

        const mean= Object.values(values).map(Number).reduce((a:number, i:number) => a + i ) / Object.values(values).length ;
        const sender= from.value[0]?.address;

        //check whether is a valid email address
        await check(sender).isEmail().withMessage("email not valid");
        
        if(!sender){
            throw new Error("No sender found");
        }

        const parsedEmail= {
            sender,
            values,
            mean
        };
      return parsedEmail;
  }
  catch (err) {
    console.log(err);
    return { err };
  }
};

  




























    // function nodemailer_test() {
    //     // Generate test SMTP service account from ethereal.email
    //     // Only needed if you don't have a real mail account for testing
    //     nodemailer.createTestAccount((err, account) => {
    //         if (err) {
    //             console.log(err);
    //             return;
    //         }
    //         // create reusable transporter object using the default SMTP transport
    //         const transporter = nodemailer.createTransport({
    //             host: "smtp.ethereal.email",
    //             port: 587,
    //             secure: false, // true for 465, false for other ports
    //             auth: {
    //                 user: account.user, // generated ethereal user
    //                 pass: account.pass, // generated ethereal password
    //             },
    //         });
    
    //         // setup email data with unicode symbols
    //         const mailOptions: Mail.Options = {
    //             from: "\"Fred Foo 👻\" <foo@blurdybloop.com>", // sender address
    //             to: "bar@blurdybloop.com, baz@blurdybloop.com", // list of receivers
    //             subject: "Hello ✔", // Subject line
    //             text: "Hello world?", // plain text body
    //             html: "<b>Hello world?</b>", // html body
    //         };
    
    //         // send mail with defined transport object
    //         transporter.sendMail(mailOptions, (err, info: SMTPTransport.SentMessageInfo) => {
    //             if (err) {
    //                 console.log(err);
    //                 return;
    //             }
    //             console.log(info.accepted, info.rejected, info.pending);
    //             console.log("Message sent: %s", info.messageId);
    //             // Preview only available when sending through an Ethereal account
    //             console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
    //             // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    //             // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    //         });
    //     });
    // }