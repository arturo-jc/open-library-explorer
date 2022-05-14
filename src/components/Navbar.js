import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <NavLink className={styles['nav-logo']} to='/'>Home</NavLink>
        </div>
    );
}

export default Navbar;