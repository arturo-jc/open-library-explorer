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
            <h1>Welcome</h1>
            <h2>Explore popular subjects</h2>
            <ul>
                {subjects.map((subject, index) => (
                    <li key={index}>
                        <Link to={"/subjects/" + subject}>{subject}</Link>
                    </li>
                ))}
            </ul>
            <h2>Search books by subject</h2>
        </Fragment>
    )
}

export default Main;