const express = require('express');
const morgan = require('morgan');
const rateLimit=require("express-rate-limit");
const helmet=require("helmet"); 
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
  max:3,
  windowMs:60*60*1000,
  message:"To many requests from this IP, please try again in an hour"
});

app.use("/api",limiter);
app.use(express.json({limit:'10kb'}));
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