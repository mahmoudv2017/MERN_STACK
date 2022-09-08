const mongoose= require('mongoose')

const client_schema = new mongoose.Schema({

    name : {
        type : String
    },
    email : {
        type : String
    },
    phone : {
        type : String
    }
})


module.exports = mongoose.model('Client' , client_schema)