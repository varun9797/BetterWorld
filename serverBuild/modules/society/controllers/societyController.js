'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _societyModel = require('./../models/societyModel');

var _societyModel2 = _interopRequireDefault(_societyModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var database = require('../../../../database/database');
var cors = require('cors');
var jwt = require('jsonwebtoken');

process.env.SECRET_KEY = "varunv";

var SocietyController = function SocietyController() {
    var _this = this;

    _classCallCheck(this, SocietyController);

    this.registerOwner = function (req, res) {
        _this.societyModel.registerOwner(req).then(function (dbResponse) {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            console.log("catch block of registerOwner ", err);
            res.status(err.satusCode).json(err);
        });
    };

    this.getDetails = function (req, res) {
        _this.societyModel.getDetails(req).then(function (dbResponse) {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            console.log("catch block of getDetails", err);
            res.status(err.satusCode).json(err);
        });
    };

    this.getDetailsUsingQueryParam = function (req, res) {
        console.log('select * from ' + req.params.tableName + ' where ' + req.params.columnName + ' = ' + req.query.value);
        _this.societyModel.getDetailsUsingQueryParam(req).then(function (dbResponse) {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            console.log("catch block of getDetailsUsingQueryParam", err);
            res.status(err.satusCode).json(err);
        });
    };

    this.updatePendingPaymentOfFlat = function (req, res) {
        console.log('update flat set pendingpayment = \'' + req.body.pendingPayment + '\' where ownerid =' + req.body.ownerid + ' and flatId =' + req.body.flatid + ';');
        _this.societyModel.updatePendingPaymentOfFlat(req).then(function (dbResponse) {
            console.log("updatePendingPaymentOfFlat successfully done!!");
            _this.updatePaymentHistory(req, function (resFlag, responseData) {
                if (resFlag) {
                    res.status(dbResponse.satusCode).json(responseData);
                } else {
                    res.status(400).json(responseData);
                }
            });
        }).catch(function (err) {
            console.log("catch block of updatePendingPaymentOfFlat", err);
            res.status(err.satusCode).json(err);
        });
    };

    this.updatePaymentHistory = function (reqBody, callback) {
        var currentDate = new Date();
        //console.log(`update paymentHistory set paymentHistory = '${req.body.pendingPayment}' where ownerid =${req.body.ownerid} and flatId =${req.body.flatid};`)
        console.log('insert into paymenthistory(flatid,paid,createddate,updateddate,ownerid) values (' + reqBody.body.flatid + ',' + reqBody.body.pendingPayment + ',\'' + currentDate.toISOString() + '\',\'' + currentDate.toISOString() + '\',' + reqBody.body.ownerid + ');');
        _this.societyModel.updatePaymentHistory(reqBody).then(function (dbResponse) {
            callback(true, dbResponse);
            //res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            console.log("catch block of updatePaymentHistory", err);
            callback(false, err);
            //res.status(err.satusCode).json(err);
        });
    };

    this.registerBuilding = function (req, res) {
        console.log('insert into building(buildingname, societyid) values\n        (' + req.body.buildingName + ',\'' + req.body.societyid + '\');');
        _this.societyModel.registerBuilding(req).then(function (dbResponse) {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            console.log("catch block of registerOwner ", err);
            res.status(err.satusCode).json(err);
        });
    };

    this.registerSociety = function (req, res) {
        console.log('society register query is--- \n        insert into society(societyName, address, pincode) values \n        (\'' + req.body.societyName + '\', \'' + req.body.address + '\', \'' + req.body.pincode + '\'');
        _this.societyModel.registerSociety(req).then(function (dbResponse) {
            res.status(dbResponse.satusCode).json(dbResponse);
        }).catch(function (err) {
            console.log("catch block of registerOwner ", err);
            res.status(err.satusCode).json(err);
        });
    };

    this.societyModel = new _societyModel2.default();
};

exports.default = SocietyController;
//# sourceMappingURL=societyController.js.map