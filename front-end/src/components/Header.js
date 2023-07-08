import logo from './images/logo.png';
import classes from './Header.module.css';


const Header = () => {
    return(
        <header className={classes.t3}>
            <div className={classes.header} >
            <img src={logo} width={200} height={200} alt = "logo"/>
                <nav>
                    <ul>
                        <li>Home</li>
                        <li>Contact</li>
                        <li>Info</li>
                        <button>LogIn</button> 
                        <button>Register</button> 
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