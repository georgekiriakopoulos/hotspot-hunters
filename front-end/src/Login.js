import React, { useState } from "react";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <div className="container">
    <h2> Login Form</h2>
    <form className="loginForm" onSubmit={handleSubmit}>
      <label htmlFor="email">
        <b>Email</b>
      </label>
      <input
        type="email"
        placeholder="π.χ youremail@youremail.com"
        name="email"
        required
      />

      <label htmlFor="psw">
        <b>Συνθηματικό</b>
      </label>
      <input
        type="password"
        id="password"
        name="psw"
        placeholder="********"
        minlength="8"
        required
      />
      <button className="submit"> Σύνδεση </button>
    </form>
    <button className="notTrue" onClick={() => props.onFormSwitch('register')}>  Δεν είσαι μέλος; Κάνε Εγγραφή</button>
    </div>
  );
};
