const mongoose= require('mongoose')


const project_schema = new mongoose.Schema({

    name : {
        type : String
    },
    description : {
        type : String
    },
    cliendID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Client'
    },
    status : {
        type : String,
        enums : ['just started' , 'Not Compeleted' , 'Compeleted']
    }
    
})


module.exports = mongoose.model('Project' , project_schema)