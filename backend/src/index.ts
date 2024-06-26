import express from "express";
const app = express();
const PORT = 3000;
import rateLimit from 'express-rate-limit';
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();


let otpDB: Record<string, string> = {};
let emailPassword : Record<string, string> = {};

const details:string = "this is the thing that you get when you subscribe the course";

const otpLimiter = rateLimit({
    windowMs: 5*60*1000, // 5 mins
    max:3, //limiting each ip to 3 otp requests per windowMs
    message:'Too many requests , please try again after 5 minutes',
    standardHeaders:true,
    legacyHeaders:false
})

const passwordResetLimiter = rateLimit({
    windowMs: 15*60*1000 , //15 mins
    max:5,
    message:'Too many password reset attempts , please try again after 15 mins',
    standardHeaders:true,
    legacyHeaders:false
})




app.use(express.json());
app.use(cors());

app.post('/getotp',otpLimiter,  (req,res)=>{
    const email = req.body.email;
    if(email){
        const otp = Math.floor((100000 + (Math.random() * 900000))).toString();

        console.log(otp);
        console.log(otpDB);
        
        
        otpDB[email] = otp;
        console.log(emailPassword);
        
        return res.json({
            msg:'The otp has been generated and logged'
        })
    }else{
        return res.json({
            msg:'Invalid input'
        })
    }
})

app.post('/reset-password', passwordResetLimiter, async (req, res) => {
    const { email, newpassword, otp, token } = req.body;
    if (email && newpassword && otp && token) {
      const secret:any = process.env.SECRET;
      let formData = new FormData();
      formData.append('secret', secret);
      formData.append('response', token);
  
      const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
      const result = await fetch(url, {
        body: formData,
        method: 'POST'
      });
      
      const data = await result.json();
  
      if (data.success && otpDB[email] === otp) {
        emailPassword[email] = newpassword;
        return res.status(200).json({
          msg: `The password has been updated for ${email}, new password is ${newpassword}`
        });
      } else {
        return res.status(400).json({
          msg: 'Invalid OTP, email, or token'
        });
      }
    } else {
      return res.status(400).json({
        msg: 'Invalid input'
      });
    }
  });

app.post('/login', (req, res)=>{
    const [email, password] = req.body;
    if(email && password){
        if(!emailPassword[email]){
            return res.json({
                msg: 'Not registered'
            })
        }
        if(emailPassword[email] === password){
            return res.json({
                msg: details
            })
        }else{
            return res.json({
                msg: 'wrong password'
            })
        }
    }else{
        return res.json({
            msg:'Invalid input'
        })
    }
})



app.listen(PORT, ()=>{
    console.log(`server is listening on http://localhost:${PORT}`);
    
})