const mongoose = require('mongoose');

mongoURI =  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}`;

const databaseConnect = async() =>{
    try{
        await mongoose.connect(mongoURI);
        console.log("database connected");
    }catch(error){
        console.log(error);
    }
}

module.exports = databaseConnect;