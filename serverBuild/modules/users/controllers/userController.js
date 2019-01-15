"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userModel = require("./../models/userModel");

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function UserController() {
    var _this = this;

    _classCallCheck(this, UserController);

    this.executeQuery = function (req, res) {
        _this.userModel.executeQuery(req).then(function (dbResponse) {
            console.log("-----db response----", dbResponse);
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            console.log("-----db err----", err);
            res.status(err.satusCode).json(err);
        });
    };

    this.registerUser = function (req, res) {
        _this.userModel.registerUser(req).then(function (dbResponse) {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            res.status(err.satusCode).json(err);
        });
    };

    this.loginUser = function (req, res) {
        _this.userModel.loginUser(req).then(function (dbResponse) {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            res.status(err.satusCode).json(err);
        });
    };

    this.getUser = function (req, res) {
        _this.userModel.getUser(req).then(function (dbResponse) {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            res.status(err.satusCode).json(err);
        });
    };

    this.userModel = new _userModel2.default();
};

exports.default = UserController;
//# sourceMappingURL=userController.js.map