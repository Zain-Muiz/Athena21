
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
var db = require('../models/dbconnect');
var path = require('path');
app.use(express.static('public'));


    module.exports.login = (req,res) =>{
 
        
    try{
        const {email, password} = req.body;
        req.session.email = email;
        
        if(!email || !password){
            
           return res.status(401).render("adminlogin",{
                    message: "Email Or Password Incorrect"
                });
        }
        db.query("SELECT * FROM admin where email = ?", [email], async(error, results)=>{
            if(results.length === 0){
                return res.status(401).render("adminlogin",{
                    message: "Email Or Password Incorrect"
                });
            }
            // else{
            //     username = results[0].name;
            //     admintype = results[0].category;             
            // }
            else if(error){
                console.log(error)
            }
            else if( !results || !(await (bcrypt.compare(password, results[0].password))) ){

                return res.status(401).render("adminlogin",{
                    message: "Email Or Password Incorrect"
                });
            }
            else{
                
                req.session.name=  results[0].name;
                req.session.admintype = results[0].category;
                res.redirect('/admindashboard');
                
            }
        })
        
    }
    catch(error){
        console.log(error);

    }}

    module.exports.adminroute = (req,res) =>{
        console.log(req.session.name);
 
        admintype = req.session.admintype;
        if (admintype == "organizer"){
            res.render('orgdashmain',{name: req.session.name});
        }
        else if (admintype == "superadmin"){
            res.render('orgdashmain');  
        }
        else if (admintype == "volunteer"){
            res.render('orgdashmain');  
        }
        else if (admintype == "finhead"){
            res.render('finhead');  
        }
        else if (admintype == "registration"){
            res.render('regadmin', {name: req.session.name, user : "Registration"});  
        }
        else{
            return res.status(401).render("adminlogin",{
                message: "Unauthorize Access. You have been reported"
            });
    }

        try{
           //console.log('try keri');
            
        }
        catch(error){
            console.log(error);
    
        }
      
    }


    module.exports.getregistrations = (req,res) =>{
        db.query('SELECT * FROM paidregistration ORDER BY `name` ASC', (err,result) => {
            if(err){
                console.log(err);
            }
            else{
                console.log(result);
                res.render('regadmin/regdetailsadmin', {user: "Registration", head: "Paid Registration", paidregistrations: result, btntext: "PAID", btnclass:"success"})
            }
        })
        
    }
    module.exports.getallregistrations = (req,res) =>{
        db.query('SELECT DISTINCTROW `name`,`email`, `eventName1`,`phNo`  FROM `registration` r WHERE NOT EXISTS (SELECT `email` FROM `paidregistration` p WHERE r.`email` = p.`email`) ORDER BY `name` ASC', (err,results) => {
             if(err){
                 console.log(err);
             }
             else{
                 console.log(results);
                res.render('regadmin/regdetailsadmin', {user: "Registration", head: "Unpaid Registration", paidregistrations: results, btntext: "UNPAID", btnclass:"danger"})
             }
        })
         
        
    }
