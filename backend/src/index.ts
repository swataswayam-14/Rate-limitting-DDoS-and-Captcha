import express from "express";
const app = express();
const PORT = 3000;


let otpDB: Record<string, string> = {};
let emailPassword : Record<string, string> = {};

const details:string = "this is the thing that you get when you subscribe the course";

app.use(express.json());

app.post('/getotp', (req,res)=>{
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

app.post('/reset-password', (req,res)=>{
    const {email , newpassword , otp} = req.body;
    if(email && newpassword && otp){
        if(otpDB[email] === otp){
            emailPassword[email] = newpassword;
            console.log(emailPassword);
            
            return res.status(200).json({
                msg:'The password has been updated'
            })
        }else{
            return res.status(400).json({
                msg:'Invalid otp or email'
            })
        }
    }else{
        return  res.status(400).json({
            msg:'Invalid input'
        })
    }
})

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