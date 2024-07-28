var jwt = require('jsonwebtoken');
const JWT_SECERET = 'pranjal@kajal@wasgoodfriend2343'
const fetchuser = (req,res,next)=>{
    //get user from the jwt token and id to req obj
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"pease authenticate using valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECERET);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"pease authenticate using valid token"})

    }
    
}
module.exports=fetchuser;
