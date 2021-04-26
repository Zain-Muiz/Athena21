const express = require('express');
const app = express();

module.exports.RedirectLogin = (req,res,next) => {
    if(!req.session.name){
        res.redirect("/login");
    }
    else{
        next();
    }
}
module.exports.RedirectHome = (req,res,next) => {
    if(req.session.name){
        if(req.session.verifieduser == "1"){
        res.redirect("/userdashboard");
        }
        else
        res.redirect("/auth/verifymail")
    }
    else{
        next();
    }
}

module.exports.RedirectVerify = (req,res,next) => {
    if(req.session.name){
        if(req.session.verifieduser == "1"){
        next();
        }
        else
        res.redirect("/auth/verifymail")
    }
    else{
        next();
    }
}