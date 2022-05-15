import { Fragment } from "react";
import { Link } from "react-router-dom";
import style from './Main.module.css';

const Main = () => {
    const subjects = [
        'romance',
        'history',
        'science',
        'adventure'
    ]

    return (
        <Fragment>
            <h1>Explore Popular Subjects</h1>
            <ul>
                {subjects.map((subject, index) => (
                    <li className={style['subject-item']} key={index}>
                        <Link to={"/subjects/" + subject}>{subject}</Link>
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}

export default Main;