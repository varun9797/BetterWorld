var database = require('./../../../../database/database');
var cors = require('cors')
var jwt = require('jsonwebtoken');
process.env.SECRET_KEY = "varunv";

class UserModel {

    executeQuery = (req) => new Promise((resolve, reject)=>{
        var appData = {
            "error": 1,
            "data": "",
            "status":"",
            "dbData":"",
            "fields":"",
            "satusCode":""
        };
        var query = req.body.query;
        console.log("query is "+query);
        database.connection.query(query, function(err, rows) {
            if (!err) {
                console.log("query executed successfully successfully "+JSON.stringify(rows));
                appData.error = 0;
                appData["status"] = "success!";
                appData["satusCode"] = 201;
                appData["dbData"] = rows;
                resolve(appData)
                //res.status(201).json(appData);
            } else {
                console.log("Query Exception "+err);
                appData["data"] = "Error Occured!";
                appData["satusCode"] = 400;
                appData["err"] = err;
                reject(appData)
                //res.status(400).json(err);
            }
        });
})


    registerUser= (req, res) => new Promise((resolve, reject)=>{
        var today = new Date();
        var appData = {
            "error": 1,
            "data": "",
            "satusCode":"",
            "dbResponse":""
        };
        var userData =[req.body.email, req.body.first_name, req.body.last_name, req.body.password, req.body.phoneNumber]
        database.connection.query('insert into users(email,first_name,last_name,password, phonenumber) values ($1, $2, $3, $4, $5)', userData, function(err, rows, fields) {
            if (!err) {
                console.log("query is working fine "+rows);
                appData.error = 0;
                appData["data"] = "User registered successfully!";
                appData["satusCode"] = rows;
                appData["dbResponse"] = 201;
                resolve(appData);
                //res.status(201).json(appData);
            } else {
                console.log("got error "+err)
                appData["data"] = "Error Occured!";
                appData["satusCode"] = 400;
                appData.error = err;
                reject(appData);
                //res.status(400).json(err);
            }
        });
    })

    loginUser = (req, res) => new Promise((resolve, reject) => {
        var appData = {
            "error": 1,
            "data": "",
            "satusCode":""
        };
        var email = req.body.email;
        var password = req.body.password;
        console.log("data is "+JSON.stringify(req.body));
        database.connection.query('SELECT * FROM owner WHERE email = $1', [email], function(err, dbResponse, fields) {
            if (err) {
                console.log("error is ");
                console.log(err);
                appData.error = 1;
                appData["data"] = "Error Occured!";
                appData["error"] = err;
                appData["satusCode"] = 400;
                reject(appData);
                //res.status(400).json(appData);
            } else {
                console.log("no error is ");
                let rows = dbResponse.rows;
                console.log(rows);
                if (rows.length > 0) {
                    console.log("rows.length is ");
                    if (rows[0].password == password) {
                        console.log("password match ");
                        console.log("rows[0] "+JSON.stringify(rows[0]));
                        let token = jwt.sign(rows[0], process.env.SECRET_KEY, {
                            expiresIn: 1440
                        });
                        appData.error = 0;
                        appData.isAdmin = rows[0].isadmin;
                        appData["token"] = token;
                        appData["satusCode"] = 200;
                        resolve(appData);
                        //res.status(200).json(appData);
                    } else {
                        console.log("password not match ");
                        appData.error = 1;
                        appData["data"] = "Email and Password does not match";
                        appData["satusCode"] = 204;
                        reject(appData);
                        //res.status(204).json(appData);
                    }
                } else {
                    console.log("else ");
                    appData.error = 1;
                    appData["data"] = "Email does not exists!";
                    appData["satusCode"] = 204;
                    reject(appData);
                    //res.status(204).json(appData);
                }
            }
        });

    });

    getUser = (req, res) => new Promise((resolve, reject) => {
        var appData = {};
        database.connection.query('SELECT * FROM users', function(err, dbResponse, fields) {
            if (!err) {
                let rows = dbResponse.rows;
                appData["error"] = 0;
                appData["data"] = rows;
                appData["satusCode"] = 200;
                resolve(appData);
                //res.status(200).json(appData);
            } else {
                appData["data"] = "No data found";
                appData["satusCode"] = 204;
                reject(appData);
                //res.status(204).json(appData);
            }
        });
    });
}

export default UserModel;