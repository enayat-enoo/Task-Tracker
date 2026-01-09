const mongoose = require("mongoose");

async function connectDb(url){
    try{
        return await mongoose.connect(url);
    }catch(e){
        console.log(e);
    }
}

module.exports = connectDb;