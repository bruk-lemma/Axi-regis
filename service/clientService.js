const {ClientRepository}=require('./database');

class ClientService{
    constructor(){
        this.repository=new ClientRepository();
    }
    
    async AddnewClient(id,clientinputs){
     const{first_name,last_name,address,phone_number,child_grade,child_gender,createdAt}=clientinputs;
     try{
        const client=await this.repository.createClient({first_name,last_name,address,phone_number,child_gender,child_grade,createdAt})
        return client; 
    }catch{
        return " can not create client";
    }
    }

}
