import UserModel from './../models/userModel'

class UserController {
    
    constructor(){
        this.userModel = new UserModel();
    }
    executeQuery = (req, res) =>{
        this.userModel.executeQuery(req).then((dbResponse)=>{
            console.log("-----db response----",dbResponse);
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch((err)=>{
            console.log("-----db err----",err);
            res.status(err.satusCode).json(err);
        })
    }

    registerUser= (req, res) =>{
        this.userModel.registerUser(req).then((dbResponse)=>{
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch((err)=>{
            res.status(err.satusCode).json(err);
        })
    }

    loginUser = (req, res) => {
        this.userModel.loginUser(req).then((dbResponse)=>{
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch((err)=>{
            res.status(err.satusCode).json(err);
        })
    }

    getUser = (req, res) =>{
        this.userModel.getUser(req).then((dbResponse)=>{
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch((err)=>{
            res.status(err.satusCode).json(err);
        })
    }
}

export default UserController;