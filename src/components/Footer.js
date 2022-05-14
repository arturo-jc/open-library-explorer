import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import globalStyles from '../App.module.css';
import { ReactComponent as OpenLibraryLogo } from '../openlibrary-logo-tighter.svg';

const Footer = () => {
    return (
        <footer className={`${styles.footer} ${globalStyles.padded}`}>
            Powered by
            <Link
                to={{ pathname: "https://openlibrary.org/" }}
                target="_blank"
            >
                <OpenLibraryLogo className={styles['open-library-logo']} />
            </Link>
        </footer>
    )
};

export default Footer;