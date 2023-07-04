
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';


const Header = () => {
    return(
        <header className={classes.t3}>
            <div className={classes.header} >
                <h2 className={classes.t1}> HOT SPOT HUNTERS</h2>
                <nav>
                    <ul>
                        <li>Home</li>
                        <li>Contact</li>
                        <li>Info</li>
                        <li>SignIn</li> 
                        <li>LogIn</li> 
                    </ul>
                </nav>
            </div>
            <div className={classes.header1} >
                
                    <h2 className={classes.t2}>FREE WIFI</h2>
               


            </div>



        </header>

    );
};

export default Header;