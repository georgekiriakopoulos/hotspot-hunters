import logo from './images/logo.png';
import classes from './Header.module.css';
import 'reactjs-popup/dist/index.css';
import { useState } from 'react';
import Login from '../components/Login'
import Register from './Register'
import { GetAuthenticationToken  } from './authentication/GetAuthenticationToken';
import { DeleteToken } from './authentication/Deletetoken';
 


function Header ()  {

    const [openpopuplogin, setvaluelogin] = useState(false);
    const [openpopupregister, setvalueregister] = useState(false);
    const temp = GetAuthenticationToken();


    return(
        
        <header className={classes.t3}>
            <div className={classes.header} >
            <img src={logo} width={200} height={200} alt = "logo"/>
                <nav>
                    <ul>

                       
                        <div>
                        {temp && (<div  >
                            <button onClick={ () => setvalueregister(true)}
                        >Περιοχές ενδιαφέροντος</button> 
                            <button onClick={ DeleteToken}
                        >Αποσύνδεση</button> 
                        </div>)}

                        </div>

                        <div>
                        {!temp && (<div  >
                            <button onClick={ () => setvalueregister(true)}
                        >Εγγραφή</button> 
                        <button onClick={ () => setvaluelogin(true)}
                        >Σύνδεση</button>
                        </div>)}

                        </div>
                     



                    </ul>
                </nav>
            </div>
            <div className={classes.header1} >
               
                <h2 className={classes.t2}>Ψάχνεις δωρεάν wifi; Εδώ θα βρεις όλα τα σημεία της Ελλάδας!</h2>
                <Login open={openpopuplogin}
                        onClose={ ()=>setvaluelogin(false)} />
                <Register open={openpopupregister}
                        onClose={ ()=>setvalueregister(false)} />       
            </div>



        </header>

    );
};

export default Header;