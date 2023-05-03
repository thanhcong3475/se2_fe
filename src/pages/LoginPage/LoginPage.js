import React, { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import "./LoginPage.scss";

function Login() {
  const navigate = useNavigate()
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  async function login(event) {
    event.preventDefault()
    try {
      await axios.post('', {
        Email: Email,
        Password: Password,
      }).then((res) => {
        console.log(res.data)
        if (res.data.message == 'Email not exits') {
          console.log("Email not exits")
        } else if (res.data.message == 'Login Success') {
          navigate('/')
        } else {
          console.log("Incorrect email or password")
        }
      }, fail => {
        console.error(fail) 
      })
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      <p className="loginTitle">Login Form</p>
  
      <form className="loginForm" >
        <input type="email" placeholder="Email" value={Email} onChange={(event) => {setEmail(event.target.value)}}/>

        <input type="password" placeholder="Password" value={Password} onChange={(event) => {setPassword(event.target.value)}}/>
        <button type={"submit"} onClick={login} style={{ backgroundColor: "#a1eafb" }} />
      </form>
    </>
  );
}
export default Login;