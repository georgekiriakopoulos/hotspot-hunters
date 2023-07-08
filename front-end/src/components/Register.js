import style from './Login.module.css';

function Register ({ open, onClose }) {
  if (!open) return null;
  return (
    <div onClick={onClose} className={style.overlay}>
      <h2> Register Form</h2>
      <form className="registerForm" >
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

        <button className="submit">Εγγραφή</button>
      </form>
      <button className="notTrue" > Είσαι ήδη μέλος; Συνδέσου!</button>
    </div>
  );
};

export default Register;

