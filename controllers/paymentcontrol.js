const express = require('express');
const app = express();
var db = require('../models/dbconnect');
const path = require("path");
var dash = require('../src/server');





module.exports.amountgenerator = (req,res) =>{
    // db.query("SELECT FROM registration WHERE name = ? ",[req.session.name], async(error, regresults)=>{
    //     if(regresults.length===0){
    //         console.log(results);
    //         return res.send("Email Or Password Incorrect");
    //     }
    //     if(error){
    //         console.log(error)
    //     }
    // console.log(regresults);
    console.log(req.session.regdetails);
    console.log(req.session.regdetails.event1)
    db.query("SELECT * FROM events ", async(error, results)=>{
    if(results.length===0){
        console.log(results);
        return res.send("Email Or Password Incorrect");
    }
     else{
        CoupunCode = [{name:"hi",amount:50},{name: "hello", amount:100}];
        event1 = req.session.regdetails.event1;
        event2 = req.session.regdetails.event2;
        event3 = req.session.regdetails.event3;
        IsteReg = req.session.regdetails.ISTEregno;
        enteredCCode = "hello";
        registeredevents = [];
        
        registrationamount =0;
        console.log(registrationamount);  
        console.log(results);
        results.forEach(event => {
            console.log("hey");
            console.log(event.name);
            if(event.name == event1){
                eventname = event.name;
                eventmoney = event.eventamount;
                registrationamount += event.eventamount;
                registeredevents.push({eventname,eventmoney});
            }
            if(event.name == event2){
                eventname = event.name;
                eventmoney = event.eventamount;
                registrationamount += event.eventamount;
                registeredevents.push({eventname,eventmoney});
            }
            if(event.name == event3){
                eventname = event.name;
                eventmoney = event.eventamount;
                registrationamount += event.eventamount;
                registeredevents.push({eventname,eventmoney});
            }
            console.log(registeredevents);
            CoupunCode.forEach(coupon =>{
                if(coupon.name == enteredCCode)
                    registrationamount-=coupon.amount;
            })
            
        });      
        res.render('payment', {events:registeredevents,registrationamount:registrationamount});  
     }
    if(error){
        console.log(error)
    }
})
    
//}) db querry
}