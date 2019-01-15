var express = require("express");
var router = express.Router();
var cors = require('cors');

import UserController from "./../controllers/userController";
import UserValidator from "./../validator/userValidator";


const userController = new UserController();
const userValidator = new UserValidator();
router.use(cors());
router.get('/validateToken',userValidator.validateToken);
router.post('/executeQuery',userController.executeQuery);
router.post('/register',userController.registerUser);
router.post('/login',userController.loginUser);
router.get('/getUser',userValidator.validateUser, userController.getUser);


module.exports = router;