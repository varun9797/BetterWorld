'use strict';

var _societyController = require('../controllers/societyController');

var _societyController2 = _interopRequireDefault(_societyController);

var _userValidator = require('./../../users/validator/userValidator');

var _userValidator2 = _interopRequireDefault(_userValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require("express");
var router = express.Router();
var cors = require('cors');
var jwt = require('jsonwebtoken');

var societyController = new _societyController2.default();
var userValidator = new _userValidator2.default();
router.use(cors());
router.post('/registerBuilding', societyController.registerBuilding);
router.post('/registerSociety', societyController.registerSociety);
router.post('/registerOwner', societyController.registerOwner);
router.put('/flat/pendingPayment', userValidator.validateUser, societyController.updatePendingPaymentOfFlat);
router.get('/:tableName/:columnName', societyController.getDetailsUsingQueryParam);
router.get('/:tableName', societyController.getDetails);

module.exports = router;
//# sourceMappingURL=societyRouter.js.map