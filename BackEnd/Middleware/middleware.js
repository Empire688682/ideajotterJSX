import jwt from 'jsonwebtoken';

export const tokenVerify = (req, res, next) =>{
    const token = req.headers["authorization"];

    if(!token){
      return  res.json({success:false, message:"No token available"})
    };

    jwt.verify(token, process.env.TOKEN_KEY, (error, decoded) =>{
        if(error){
            return  res.json({success:false, message:"Not authrization"})
        };
        req.userId = decoded.userId;
        next()
    });
}
