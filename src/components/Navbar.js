import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css';
import { ReactComponent as NavLogo } from '../books.svg';
import SearchForm from "./SearchForm";

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <NavLink className={styles['nav-link']} to='/'>
                <NavLogo className={styles['nav-logo']} />
                Open Library Explorer
            </NavLink>
            <SearchForm />
        </div>
    );
}

export default Navbar;