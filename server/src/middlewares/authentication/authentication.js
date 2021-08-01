const jwt = require("jsonwebtoken");

const Authentication = (req, res, next) =>{
    let token = req.get("authorization");
    if(token){
        authtoken = token.slice(7);
          jwt.verify(authtoken, "process.env.JWT_KEY", (err, user) =>{
            if(err){
                return res.json({err: err});
            }
            else{
                req.user = user;
                next();
            }
        })
    }
    else{
        return res.sendStatus(403);
    }
};

const generateAccessToken = (userId, role) =>{
    return jwt.sign({userId, role}, "process.env.JWT_KEY", {expiresIn:"1h"}); 
};

const adminVerify = (req, res, next) => {
    if(req.user.role === "admin")   next();
    else
    res.status(201).json({
        message: "You are not allowed",
    })
};

module.exports ={ Authentication, generateAccessToken, adminVerify}