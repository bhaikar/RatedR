var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');
var fs=require('fs')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/about',function(req,res,next){
  res.render('about');
});
router.get('/contact',function(req,res,next){
  res.render('contact');
});
router.get('/events',function(req,res,next){
  res.render('gallery');
});
router.post('/submit',function(req,res,next){
  console.log(req.body)
  let name=req.body.name;
  let email=req.body.email;
  let number=req.body.number;
  fs.appendFile('data.txt',`name:${name}, email:${email}, number:${number}\n`, function(error){
    if(error){
      console.log(error);
    }
    var transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
          user:'dkbhaikar@gmail.com',
          pass:'ihxwuaaoxtddnyld'
        }
      });
      var mailoptions={
        from:'ratedr@gmail.com',
        to:email,
        subject:'Sucessfully tickets booked',
        text:'Congratulation you have sucessfully booked the tickets for the upcoming event'
      };
      transporter.sendMail(mailoptions, function(error,info){
        if(error){
          console.log(error);

        }
        else{
          // res.send('mail sucessfully send');
          res.render('success')

        }
      })

      

  });
 
});






module.exports = router;