//const ClientService=require('./services/client');
/*
module.exports=(app)=>{
    const service= new ClientService();
    
    app,post('/client',async(req,res,next){
        try{
            const{first_name,last_name,address,phone_number,child_grade,child_gender,createdAt}=req.body;
            const {data}=await service.createClient({first_name,last_name,address,phone_number,child_grade,child_gender,createdAt});
            return res.json(data);
        }catch(err){
            next(err)
        }
    });
}
*/