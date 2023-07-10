import { React, useState } from "react";
import style from "./Login.module.css";
import Helplogin from './Helplogin';
import { Navigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";



function Login({ open, onClose }) {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [mes, setmes] = useState(false);

  const submithandler = (event) => {
    event.preventDefault();
    // console.log(name);
    // console.log(password);
    actionlogin(name, password, { open, onClose },setmes);
    setname("");
    setpassword("");
  
    
  };

  const usernameinputhandler = (event) => {
    setname(event.target.value);
  };

  const passwordinputhandler = (event) => {
    setpassword(event.target.value);
  };

  if (!open) return null;
  return (
    <form onSubmit={submithandler} className={style.overlay}>
      
     
      <div   className={style.t5}>


      <div className={style.t0}>
      <h3 className={style.t1} onClick={onClose}> </h3>

      
      <h2 className={style.t3} >Συνδέσου!</h2>
      <h3 className={style.t1} onClick={onClose}>X</h3>


      </div>

       
     

      <div>
        <div className="loginForm">
          <label className={style.label} htmlFor="email">
            <b>Email</b>
          
          <input
            type="email"
            placeholder="π.χ youremail@youremail.com"
            name="email"
            required
            onChange={usernameinputhandler}
            value={name}
            
          />
          </label>
        </div>
      </div>

      <div>
        <div className="loginForm">
          <label htmlFor="psw">
            <b>Συνθηματικό</b>
          
          <input
            type="password"
            id="password"
            name="psw"
            placeholder="********"
            required
            onChange={passwordinputhandler}
            value={password}
          />
          </label>
        </div>
      </div>
      <div>
        <button className={style.loginBtn} > Σύνδεση </button>
      </div>

      <button className={style.notTrue}> Δεν είσαι μέλος; Κάνε Εγγραφή</button>
      <Helplogin open={mes} >

          
      </Helplogin>
  
      
      
      </div>    
    </form>
  );
}

export default Login;

export async function actionlogin(name, password,{ open, onClose },setmes) {

  const datasend = {
    email: name,
    password: password,
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datasend),
  };
  console.log(datasend.username);
  console.log(datasend.password);

  const response = await fetch(
    "http://127.0.0.1:8000/api/login/",
    requestOptions
  );

  const requestdata = await response.json();
  const token = requestdata.access;
  console.log("token");
  console.log(response.status );

  localStorage.setItem('token',token);



  if(response.status === 401 ){
    setmes(true);
    console.log("tokrfvervreen");

  }
  else{

    localStorage.setItem('token',token);
    window.location.reload(false);
    onClose();
  
  }
  

 

}
