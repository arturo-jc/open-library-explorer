import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css';
import { ReactComponent as NavLogo } from '../books.svg';

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <NavLink className={styles['nav-link']} to='/'>
                <NavLogo className={styles['nav-logo']} />
                Open Library Explorer
            </NavLink>
        </div>
    );
}

export default Navbar;