// import db
const db=require('./db')

// import jsonwebtoken
const jwt=require('jsonwebtoken')

// register
const register=(username,userid,password)=>{
    return db.User.findOne({
        userid
    }).then(user=>{
        if(user){
            return{
                status:false,
                message:"User already exit....Please login",
                statusCode:401
            }
        }
        else{
            // insert into db
            const newUser=new db.User({
                name:username,
                userid,
                password,
                event:[]
            })

            newUser.save()
            return{
                status:true,
                message:"Registered successfully",
                statusCode:200
            }
        }
    })
}

// login
const login=(userid,password)=>{
    return db.User.findOne({
        userid,
        password
    }).then(user=>{
        if(user){
            currentUser=user.name
            currentUserid=userid
            // token generation
            token=jwt.sign({
                // store account number inside the token
                currentUserid:userid
            },'supersecretkey12345')
            return{
                status:true,
                message:"Login successfully",
                statusCode:200,
                currentUser,
                currentUserid,
                token
        }
    }
    else{
        return{
            status:false,
            message:"Invalid userid or password",
            statusCode:401
    }
    }
    })
}

// add event
const addEvent=(req,date,event)=>{

    let currentUserid=req.currentUserid
    console.log("hai"+currentUserid);
    return db.User.findOne({
        userid:currentUserid
    }).then(user=>{
        if(user){
            user.event.push({
                date:date,
                event:event
            })
            user.save()
            return{
                status:true,
                message:"Event added successfully",
                statusCode:200
            }
        }else{
            return{
            status:false,
            message:"Invalid userid or password",
            statusCode:401
            }
        }
    })
}


// get event
const getEvent=(req,currentUserid)=>{
    let userid=currentUserid
    console.log(userid+"one");
    return db.User.findOne({
        userid
    }).then(user=>{
        if(user){
            return{
                status:true,
                statusCode:200,
                event:user.event
            }
        }
        else{
            return{
                status:false,
                message:"User does not exist!!",
                statusCode:401
            }
        }
    })
}

const removeEvent=(req,k)=>{
    let loggedUserId=req.currentUserid
    return db.User.findOne({
        userid: loggedUserId
    }).then(user=>{
        if(user){
            console.log(user);
            user.event.splice(k,1)
        }
        user.save()
        return{

            status:true,
            message:"event is deleted",
            statusCode:200
        }
    })
}

module.exports={
    register,
    login,
    addEvent,
    getEvent,
    removeEvent
}