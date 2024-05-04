const jsonWebToken= require('jsonwebtoken');


function verifyToken(req,res,next){
    const authorizeHeader = req.headers.authorization;
    if(!authorizeHeader){
        return res.status(401).json({error:'no token provided!'})
    }

    if(!authorizeHeader.startsWith('Bearer ')){
        return res.status(401).json({error:'Invalide token fomat!'})
    }

    const token = authorizeHeader.slice(7);

    if(!token){
        return res.status(401).json({error:'Invalide token!'})
    }

    try{
        const decordedData = jsonWebToken.verify(token,process.env.SECRET_KEY)
        console.log(decordedData);
        next();
    }catch(error){
        return res.status(401).json({error:'Invalide token!'})
    }

}

module.exports=verifyToken;