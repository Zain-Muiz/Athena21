const express = require('express');
const app = express();
var db = require('../models/dbconnect');
const path = require("path");
var dash = require('../src/server');
var Razorpay=require("razorpay");
var bodyParser = require('body-parser');
const session = require('express-session');
var request = require('request');


let instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY , // your `KEY_ID`
  key_secret:process.env.RAZORPAY_SIGNATURE  // your `KEY_SECRET`
})

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
        //console.log(results);
        return res.send("EVENTS ERROR : Contact Administrator");
    }
     else{
        discammount = 100;
        registrationamount=0;
        amnt = 200;
        CouponCode = [{name : "AMAP100", amount : discammount},
        {name : "ANEN100",amount : discammount},
        {name : "MUHS100",amount : discammount},
        {name : "EMYR100",amount : discammount},
        {name : "NIHC100",amount : discammount},
        {name : "ANNJ100",amount : discammount},
        {name : "SONP100",amount : discammount},
        {name : "MEEB100",amount : discammount},
        {name : "AFNM100",amount : discammount},
        {name : "HADA100",amount : discammount},
        {name : "ADIS100",amount : discammount},
        {name : "KARS100",amount : discammount},
        {name : "RKAR100",amount : discammount},
        {name : "AISR100",amount : discammount},
        {name : "AYSN100",amount : discammount},
        {name : "AHAZ100",amount : discammount},
        {name : "MOHA100",amount : discammount},
        {name : "AFSS100",amount : discammount},
        {name : "BENM100",amount : discammount},
        {name : "KAVK100",amount : discammount},
        {name : "AMAM100",amount : discammount},
        {name : "AKSB100",amount : discammount},
        {name : "JERJ100",amount : discammount},
        {name : "BOBB100",amount : discammount},
        {name : "ANCH100",amount : discammount},
        {name : "ANJM100",amount : discammount},
        {name : "JAYT100",amount : discammount},
        {name : "SALS100" ,amount : discammount},
        {name : "LUCKY100" ,amount : discammount},
        {name : "EARLYBID10" ,amount : amnt}];
        event1 = req.session.regdetails.event1;
        event2 = req.session.regdetails.event2;
        event3 = req.session.regdetails.event3;
        IsteReg = req.session.regdetails.ISTEregno;
        pcbreq= req.session.regdetails.needpcbkit;
        enteredCCode1 = req.session.regdetails.couponcode1;
        enteredCCode2 = req.session.regdetails.couponcode2;
        console.log(enteredCCode1);
        console.log(enteredCCode2);

        
        registeredevents = [];
        if(pcbreq === "on"){
        registrationamount +=800;
        }
        else{
        registrationamount =0;
        }
        console.log(registrationamount);  
        //console.log(results);
        results.forEach(event => {
            if(event.name == event1){
                eventname = event.name;
                eventmoney = event.eventamount;
                registrationamount += event.eventamount;
                //console.log(registrationamount);
                registeredevents.push({eventname,eventmoney});
            }
            if(event.name == event2){
                eventname = event.name;
                eventmoney = event.eventamount;
                registrationamount += event.eventamount;
                //console.log(registrationamount);
                registeredevents.push({eventname,eventmoney});
            }
            if(event.name == event3){
                eventname = event.name;
                eventmoney = event.eventamount;
                registrationamount += event.eventamount;
                //console.log(registrationamount);
                registeredevents.push({eventname,eventmoney});
            } })
            console.log(registeredevents);

            if(enteredCCode1 === "" && enteredCCode2===""){
                
            }
            else {
                if(enteredCCode1 != enteredCCode2){
                    CouponCode.forEach(coupon =>    {
                        console.log("Entered" + enteredCCode1+"Entered" + enteredCCode2);
                        if(coupon.name === enteredCCode1 || coupon.name === enteredCCode2){
                    registrationamount-=coupon.amount;
                        }
                        console.log("aftercoupon" + registrationamount);
                    })
                }
                if(enteredCCode1 === enteredCCode2){
                    CouponCode.forEach(coupon =>    {
                        if(coupon.name === enteredCCode1){
                    registrationamount-=coupon.amount;
                        }
                        console.log("aftercoupon" + registrationamount);
                    })
                }


            }


            ///Check for ISTE Reg Number Validity
            if(IsteReg != ""){
                db.query("SELECT * FROM `iste_member` WHERE id = ?",[IsteReg],(err,results) => {
                    if(results){
                        registrationamount -= 200;
                        console.log("aaa"+ registrationamount);
                    }
                    if(err){
                        console.log(err);
                        res.send("Error"+ err);
                    }
                } )
            }


            //////********************** */

        req.session.registrationamount = registrationamount;
        // console.log(registrationamount);
        console.log("hey line 76");
        console.log("At the end : " + registrationamount);
        res.render('payment', {events:registeredevents,registrationamount:registrationamount});  
     }
    if(error){
        console.log(error)
    }
})
    
//}) db querry
}

/**************** ORDER ID ****************/
async function orderIdcreator() {
    // return the response
    var params = {
        amount: registrationamount * 100,  
        currency: "INR",
        receipt: "athena001",
        payment_capture: '1'
      };
    return await createOrderId(params);
  }

function createOrderId(params) {
    return new Promise((resolve, reject) => {
        instance.orders.create(params).then((data) => {
            orderid = data;
            console.log("heyyyyy");
            console.log(orderid);
            resolve(orderid);
     }).catch((error) => {
            console.log(error);
            reject(error);
     }) 
    }
    )}

    /**************** ORDER ID ****************/

    /**************** PAYOUT ****************/
    
    module.exports.paymentcontrol = async(req,res) =>{
        orderid = await orderIdcreator();

        orderdet =[{id:orderid.id, key:process.env.RAZORPAY_KEY, name:req.session.name}];
        req.session.orderid = orderid;
        res.json(orderdet);
    }


    /**************** PAYOUT ****************/
    /**************** PAYOUT VERIFICATION ****************/

    module.exports.paymentaftercontrol = async(req,res) =>{
        orderid= req.session.orderid.id;
        paymentid = req.body.razorpay_payment_id;
        const {numevents, event1, event2, event3,needpcbkit, isISTE, ISTEregno,couponcode1,couponcode2} = req.session.regdetails;
        const crypto = require("crypto");
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SIGNATURE);

        hmac.update(orderid + "|" + paymentid);
        let expectedSignature = hmac.digest('hex');
        var response = {"status":"failure"}
        if(expectedSignature === req.body.razorpay_signature){
            console.log(req.session.email);
            db.query("INSERT INTO paidregistration SET ?", {name : req.session.name, email : req.session.email, eventName1: event1, eventName2: event2, eventName3: event3,needpcbkit: needpcbkit, isISTE: isISTE, ISTEregno: ISTEregno,orderid: orderid, paymentid: paymentid, isPaid: "1",couponcode1: couponcode1, couponcode2:couponcode2 },(error,reusult)=>{
            //db.query("INSERT INTO paidregistration SET ? WHERE email = ? AND orderid = ? ",[{orderid: orderid, paymentid: paymentid, isPaid: "1"},req.session.email, "NP"], (error,reusult)=>{
                if(error){
                    console.log(error)
                }
                else {
                    console.log(reusult);
                    console.log("successs");
                    
                }
            });
            response={"status":"success"}
        }
        
        res.send(response);
        }

    /**************** PAYOUT VERIFICATION ****************/