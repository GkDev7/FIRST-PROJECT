

const jwt = require("jsonwebtoken")
//changes have been made by meeee
adminAuthCheck = (req, res, next) => {

    try {
        var adminReqToken=req.headers["x-axis-token"]
       console.log("tokennnnnn:-", adminReqToken)
        var tokenRef=jwt.verify(adminReqToken, "this_is_admin_token")
          req.useremail=tokenRef.email;
        next();

    } catch{
        res.json({ success: false, msg: "authenctication failed" })
    }
}
module.exports = {
   adminAuthCheck
}

