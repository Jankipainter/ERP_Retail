const jwt = require('jsonwebtoken');
const verify =(req,res,next)=>{
//get the user from jwt token and add it to req object
const headertoken =req.header('authorization');
if(!headertoken){
   return res.status(401).send({error :"Logged Out"})
}
let token = headertoken.split(' ')[1];
console.log(token)
try {
    const verified =jwt.verify(token,process.env.jwt_secret);
console.log(verified)
    if(verified){

    next()
    return ;
}else{
    return res.status(401).send({error :"Logged Out"})
}
} catch (error) {
   return res.status(401).send({error :"Logged Out"})

}
}

module.exports= verify;