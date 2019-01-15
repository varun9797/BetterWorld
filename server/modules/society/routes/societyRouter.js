var express = require("express");
var router = express.Router();
var cors = require('cors');
var jwt = require('jsonwebtoken');

import SocietyController from "../controllers/societyController";
import UserValidator from "./../../users/validator/userValidator";

const societyController = new SocietyController();
const userValidator = new UserValidator();
router.use(cors());
router.post('/registerBuilding',societyController.registerBuilding);
router.post('/registerSociety',societyController.registerSociety);
router.post('/registerOwner',societyController.registerOwner);
router.put('/flat/pendingPayment',userValidator.validateUser, societyController.updatePendingPaymentOfFlat);
router.get('/:tableName/:columnName',societyController.getDetailsUsingQueryParam);
router.get('/:tableName',societyController.getDetails);


module.exports = router;