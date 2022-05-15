import { Fragment } from "react";
import { useParams } from "react-router-dom";
import Books from "../components/Books";
import style from './Subject.module.css';

const Subject = () => {

    const { subject } = useParams();

    return (
        <Fragment>
            <h1 className={style.heading}>{subject.replaceAll('_', ' ')}</h1>
            <Books subject={subject} />
        </Fragment>
    )
}

export default Subject;