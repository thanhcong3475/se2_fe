import React, { useState } from "react";
import axios from 'axios'
import "./RegisterPage.scss";
  
function Register() {
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  async function save(event) {
    event.preventDefault()
    try {
      await axios.post('', {
        Name: Name,
        Email: Email,
        Password: Password,
      })
      console.log(
        'success'
      )
    } catch (err) {
      console.error(err)
    }
  }
  
  return (
    <>
      <p className="registerTitle">Registration Form</p>
  
      <form className="registerForm">
        <input type="text"  placeholder="Name" value={Name} onChange={(event) => {setName(event.target.value)}} />
        <input type="email" placeholder="Email" value={Email} onChange={(event) => {setEmail(event.target.value)}}/>
        <input type="password" placeholder="Password" value={Password} onChange={(event) => {setPassword(event.target.value)}}/>
        <button type={"submit"} onClick={save} style={{ backgroundColor: "#a1eafb" }} />
      </form>
      
    </>
  );
}
export default Register;