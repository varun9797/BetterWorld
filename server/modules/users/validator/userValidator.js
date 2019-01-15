
var jwt = require('jsonwebtoken');

class UserValidator {
    validateUser = (req, res, next)=>{
        console.log("validate user");
        var token = req.body.token || req.headers['token'];
        var appData = {};
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, function(err) {
                if (err) {
                    appData["error"] = 1;
                    appData["data"] = "Token is invalid";
                    res.status(500).json(appData);
                } else {
                    next();
                }
            });
        } else {
            appData["error"] = 1;
            appData["data"] = "Please send a token";
            res.status(403).json(appData);
        }
    } 
    validateToken = (req, res, next)=>{
        console.log("validate Token");
        var token = req.body.token || req.headers['token'];
        var appData = {};
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, function(err) {
                if (err) {
                    appData["error"] = 1;
                    appData["data"] = "Token is invalid";
                    res.status(500).json(appData);
                } else {
                    appData['error'] = 0;
                    appData['data']='Token is valid';
                    res.status(200).json(appData);
                }
            });
        } else {
            appData["error"] = 1;
            appData["data"] = "Please send a token";
            res.status(403).json(appData);
        }
    }
}

export default UserValidator;