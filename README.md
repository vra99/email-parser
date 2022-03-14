# EMAIL PARSER BY VRA_99

The main purpose of this repository is to create a function that can parse emails and extract the information that is needed.

The function outputs an object (dictionary) of dates and values, and the mean of values in the same message:

For example the function will translate a message from a user such as 

10 May 2021: 9.130

11 May 2021: 12500

12 May 2021: 140.25

to:

```bash 
{

"sender": "email@example.com",

"values": {

"2021-05-10": 9.130,

"2021-05-11": 12500,

"2021-05-12": 140.25

},

"mean": 4216.46

}
```

## Deploy the app

Firstly run ``` npm install ``` to install all the dependencies.

Then run ``` npm run build ``` to build the app.

Finally run ``` npm run serve ``` to run the app at localhost:3000.

You can also run the app in development mode with nodemon by using the following command ```npm run dev```

## Testing
In order to test the app, you can use the following command:
```npm test```

You can check the app in localhost:3000 once you run the command ```npm start``` fill the form and you will receive the results from the function both in the terminal as a json stringified object and as json response on the browser.

## Technologies used
- TypeScript
- Node.js
- Express
- Pug
- Morgan
- Jest


