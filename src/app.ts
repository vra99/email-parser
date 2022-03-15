import express from "express";
import compression from "compression"; 
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import flash from "express-flash";
import path from "path";
import morgan from "morgan";
import * as homeController from "./controllers/home";

const app = express();

//To manipulate dates
app.locals.moment = require("moment");

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: "secret",
                  resave: false, 
                  saveUninitialized: false}));

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use(morgan("tiny"));

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Routes.
 */

app.get("/", homeController.index);

export default app;
