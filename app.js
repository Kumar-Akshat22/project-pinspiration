const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const flash = require("connect-flash");

const DBConnect = require("./config/database-connection");

const indexRouter = require("./routes/index.routes");
const userRouter = require("./routes/user.routes");
const pinRouter = require("./routes/pin.routes");
const { attachUser } = require("./middlewares/attachUser");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended:true,

}));
app.use(expressSession({
    secret: "keyboard cat",
    saveUninitialized: false,
    resave:false,
}))
app.use(flash());
app.use(cookieParser());
app.use(express.static('./public'));
app.use(attachUser);
dotenv.config();

app.set("view engine", "ejs");

const port = process.env.PORT || 4000;

// Middleware to make Flash messages available to all EJS templates
app.use(function(req , res , next){

    res.locals.success_msg = req.flash("success");
    res.locals.error_msg = req.flash("error");

    next();

}) 

// API ROUTES
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/pins" , pinRouter)

DBConnect().then(function(){
    app.listen(port, function () {
        console.log(`SERVER STARTED AT PORT ${port}`);
      })
});
