// import express
const express=require('express')

// import cors
const cors=require('cors')

// import dataservice
const dataservice=require('./service/dataservice')

// import jsonwebtoken
const jwt=require('jsonwebtoken')

// use express
const app=express()

// set portnumber
app.listen(3000,()=>{
    console.log("Server started 3000");
})

// cors use in app
app.use(cors({
    origin:'http://localhost:4200'
}))

// parse json data
app.use(express.json())

// application specific middleware
// const appMiddleware=(req,res,next)=>{
//     console.log("Application specific middleware");
//     next()
// }

// jwtmiddleware
const jwtmiddleware=(req,res,next)=>{
    try{
        token=req.headers['reminder-token']
        console.log("token"+token);
        // verify token
        const data=jwt.verify(token,'supersecretkey12345')
        console.log(data)
        req.currentUserid=data.currentUserid
        next()
    }
    catch{
        res.status(401).json({
            status:false,
            statusCode:401,
            message:"Please login111"
        })
    }
}


// register API
app.post('/register',(req,res)=>{
    dataservice.register(req.body.username,req.body.userid,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

// login API
app.post('/login',(req,res)=>{
    dataservice.login(req.body.userid,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

// Add event API
app.post('/addEvent',jwtmiddleware,(req,res)=>{
    dataservice.addEvent(req,req.body.date,req.body.event)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

// Get event API
app.post('/getEvent',jwtmiddleware,(req,res)=>{
    dataservice.getEvent(req,req.body.loggedUserId)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})
