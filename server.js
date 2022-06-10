const mongoose=require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB=process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
//.connect(process.env.DATABASE_LOCAL,{
.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology:true
}).then(con=>{
  //console.log(con.connections);
  console.log("DATABASE connection successfull!....");
});



const app = require('./app');

//console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
