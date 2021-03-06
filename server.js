const mongoose=require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB=process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
.connect(process.env.DATABASE_LOCAL,{
//.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology:true
}).then(con=>{
  //console.log(con.connections);
  console.log("DATABASE connection successfull!....");
});
/*const testClient=new Client({
  first_name:"Amdom",
  last_name:"gkidan",
  address:"Moenko motors",
  phone_number:"4545454545",
  child_grade:"middle school",
  child_gender:"male"
});

testClient.save().then(doc=>{
  console.log(testClient);
}).catch(err=>{
  console.log(`Error...${err}`);
});
*/
//console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
