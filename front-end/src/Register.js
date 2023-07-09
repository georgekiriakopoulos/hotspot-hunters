import React, { useState } from "react";
import "./components/Login.module.css"
export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const [psw2, setPsw2] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <div className="container">
      <h2> Register Form</h2>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="email"
          placeholder="π.χ youremail@youremail.com"
          name="email"
          required
        />

        <label htmlFor="password">
          <b>Συνθηματικό</b>
        </label>
        <input
          type="password"
          id="password"
          minlength="8"
          placeholder="********"
          name="psw"
          required
        />

        <label htmlFor="psw2">
          <b>Επιβεβαίωση Συνθηματικού</b>
        </label>
        <input
          type="password"
          id="password"
          minlength="8"
          placeholder="********"
          name="psw2"
          required
        />

        <button className="registerBtn">Εγγραφή</button>
      </form>
      <button className="notTrue" onClick={() => props.onFormSwitch('login')}> Είσαι ήδη μέλος; Συνδέσου!</button>
    </div>
  );
};
