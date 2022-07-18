// import mongoose

const mongoose=require('mongoose')

// connect mongoose to db

mongoose.connect('mongodb://localhost:27017/Remainder',{
    useNewUrlParser:true
})

// db model

const User=mongoose.model('User',{
    name:String,
    userid: String,
    password:Number,
    event: []
})

module.exports={
    User
}