import style from './Error.module.css';
import error from '../error.jpg';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className={style['error__wrapper']}>
            <img className={style.error} src={error} alt="Resource not found" />
            <p className={style['error__msg']}>It looks like something went wrong. Sorry!</p>
            <Link
                to={{ pathname: 'https://www.freepik.com/vectors/no-data' }}
                target="_blank"
            >
                No data vector created by storyset - www.freepik.com
            </Link>
        </div>
    )
}

export default Error;