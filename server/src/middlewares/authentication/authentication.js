const jwt = require("jsonwebtoken");

const Authentication = (req, res, next) =>{
    let token = req.get("authorization");
    if(token){
        authtoken = token.slice(7);
        jwt.verify(authtoken, process.env.JWT_KEY, (err) =>{
            if(err){
                return res.json({err: err});
            }
            else{

                next();
            }
        })
    }
    else{
        return res.sendStatus(403);
    }
};

const generateAccessToken = (user) =>{
    return jwt.sign({user}, process.env.JWT_KEY, {expiresIn:"1h"});
};

module.exports ={ Authentication, generateAccessToken }