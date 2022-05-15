import notfound from '../notfound.jpg';
import style from './NotFound.module.css';
import { Link } from 'react-router-dom';

const NotFound = props => {
    return (
        <div className={style['notfound__wrapper']}>
            <img className={style.notfound} src={notfound} alt="Resource not found" />
            <p className={style['notfound__msg']}>{props.message}</p>
            <Link
                to={{ pathname: 'https://www.freepik.com/vectors/no-data' }}
                target="_blank"
            >
                No data vector created by storyset - www.freepik.com
            </Link>
        </div>
    )
}

export default NotFound;