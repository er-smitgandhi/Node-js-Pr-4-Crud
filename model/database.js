const mongoose = require("mongoose");

const crudData = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    price : {
        type : Number,
        require : true
    },
    pages : {
        type : String,
        require : true
    },
    author : {
        type : String,
        require : true
    }
})

const crud = mongoose.model('crudmodel',crudData)

module.exports = crud;