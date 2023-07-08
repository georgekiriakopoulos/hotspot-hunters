import {React, useState} from 'react';
import style from './Login.module.css';
import axios from 'axios';


// export const Login = (props) => {
//   const [email, setEmail] = useState("");
//   const [psw, setPsw] = useState("");
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(email);



function Login ({ open, onClose }) {

  const [ name, setname] = useState("");
  const [password, setpassword] = useState("");
  
  const submithandler = (event) => {
    event.preventDefault();
    // console.log(name);
    // console.log(password);
    action(name,password);
    setname('');
    setpassword('');
  }
  
  const usernameinputhandler = event =>{
    setname(event.target.value);

  }
  
  const passwordinputhandler = event =>{
    setpassword(event.target.value);
  
  }

  if (!open) return null;
  return (
    <form onSubmit={submithandler} className={style.overlay}>
      <div className={style.t1} > 
      <h2> Login ..Form</h2>
      <h3 onClick={onClose}   >X</h3>
      </div>

    <div>
    <div className="loginForm" >
      <label htmlFor="email">
        <b>Email</b>
      </label>
      <input
        // type="email"
        // placeholder="π.χ youremail@youremail.com"
        // name="email"
        // required
        onChange={usernameinputhandler}
        value={name}
      />
    </div>
    </div>

<div>
<div className="loginForm" >


      <label htmlFor="psw">
        <b>Συνθηματικό</b>
      </label>
      <input
        // type="password"
        // id="password"
        // name="psw"
        // placeholder="********"
       
        // required
        onChange={passwordinputhandler}
        value={password}
      />
   
    </div>

</div>
<div>

      <button > Σύνδεση </button>

</div>

    <button >  Δεν είσαι μέλος; Κάνε Εγγραφή</button>
    </form>
  );
  };

export default Login;

export async function action (name,password) {

  const datasend ={
    email: name,
    password: password,
    password2: password   
  };
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datasend)
};
  console.log(datasend.username);
  console.log(datasend.password);

 const response = await fetch( 'http://127.0.0.1:8000/api/user/register/',
  requestOptions)
  .then(response => response.json());

  // axios.post('http://127.0.0.1:8000/api/user/register/', {
  //   email: 'Fred',
  //   password: 'Flintstone'
  // })
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

} 

