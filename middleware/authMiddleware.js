const jwt = require('jsonwebtoken');

const protect = async (req,res,next) =>{
    try{
       const authHeader = await  req.headers.authorization;

       if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            message:"No token, access denied"
        });
       }

       const token = authHeader.split(" ")[1];

       const decode = jwt.verify(token,process.env.JWT_SECRET);

       req.admin = decode;

       next();
    }
    catch(err){
      res.status(401).json({
        message:"Invalid token"
      });
    }
};

module.exports = protect;