import { Fragment } from "react";
import { Link } from "react-router-dom";

const Main = () => {
    const subjects = [
        'romance',
        'history',
        'science',
        'adventure'
    ]

    return (
        <Fragment>
            <h1>Explore popular subjects</h1>
            <ul>
                {subjects.map((subject, index) => (
                    <li key={index}>
                        <Link to={"/subjects/" + subject}>{subject}</Link>
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}

export default Main;