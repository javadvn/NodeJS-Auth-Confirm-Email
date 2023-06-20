const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
       let res = await mongoose.connect(process.env.CONNECT_DB) 
       console.log("connect db !");
    } catch (error) {
        console.log(error);
    }
   
        
}


module.exports={
    dbConnect
}