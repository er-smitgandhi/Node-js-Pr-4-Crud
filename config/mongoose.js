const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/smit-PR-4")

const db = mongoose.connection;

db.on("err",console.error.bind(console,"Db not connected"));

db.on("connected",(err)=>{
    if(err){
        console.log(err);
        return false
    }
    console.log("Db is Connected");
})

module.exports = db;
