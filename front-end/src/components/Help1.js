import { React, useState } from "react";
import style from "./Login.module.css";

// export const Login = (props) => {
//   const [email, setEmail] = useState("");
//   const [psw, setPsw] = useState("");
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(email);

function Login({ open, onClose }) {


  if (!open) return null;
  return (
        <div>
            Yparxei idi xristis me auto to mail
        </div>
  );
}

export default Login;