const express = require('express');
const morgan = require('morgan');
const rateLimit=require("express-rate-limit");
const helmet=require("helmet"); 
const mongoSanitize=require('express-mongo-sanitize');
const hpp=require('hpp');
const xss=require("xss-clean");
const clientRouter = require('./routes/clientRoutes');
const teacherRouter = require('./routes/teacherRoutes');
const userRouter=require("./routes/userRoutes");
const app = express();

//Global middlewares

//Set security http headers
app.use(helmet())


// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


const limiter=rateLimit({
  max:30,
  windowMs:60*60*1000,
  message:"To many requests from this IP, please try again in an hour"
});

app.use("/api",limiter);
app.use(express.json({limit:'10kb'}));

//data sanitization against no-sql query injection against  no-sql injection
app.use(mongoSanitize());


//data sanitization against XSS against melicious html code 
app.use(xss());

//prvent against parameter pollution
app.use(hpp({
  whitelist:['address','child_grade']
}));

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/clients', clientRouter);
app.use('/api/v1/teachers', teacherRouter);
app.use('/api/v1/users', userRouter);


module.exports = app;