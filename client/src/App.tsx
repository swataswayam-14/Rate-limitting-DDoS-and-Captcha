import React, { useState } from 'react';
import './App.css';
import { Turnstile } from "@marsidev/react-turnstile";
import axios from 'axios';

function App() {
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");

  async function sendRequest(email:any, newpassword:any, otp:any, token:any) {
    try {
      const res = await axios.post('http://localhost:3000/reset-password', {
        email,
        newpassword,
        otp,
        token
      });
      if (res.status === 200) {
        alert('You have successfully changed the password');
      }
    } catch (error) {
      alert('Please try again later');
    }
  }

  return (
    <div>
      <input onChange={(e) => {
        setOtp(e.target.value);
      }} type="text" placeholder='OTP' />
      <input onChange={(e) => {
        setEmail(e.target.value);
      }} type="text" placeholder='Email' />
      <Turnstile siteKey='0x4AAAAAAAbKrS5dpKEDU9l3' onSuccess={(token) => {
        setToken(token);
      }} />
      <input onChange={(e) => {
        setNewPassword(e.target.value);
      }} type="text" placeholder='Password' />
      <button onClick={async () => {
        await sendRequest(email, newpassword, otp, token);
      }}>Update Password</button>
    </div>
  );
}

export default App;