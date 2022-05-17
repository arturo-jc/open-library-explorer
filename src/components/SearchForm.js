import { useState } from "react";
import { useHistory } from "react-router-dom";
import style from './SearchForm.module.css';

const SearchForm = () => {

    const [subject, setSubject] = useState('');

    const subjectChangeHandler = event => {
        setSubject(event.target.value);
    }

    let history = useHistory();

    const submitHandler = event => {
        event.preventDefault();
        if(subject){
            history.push(`/subjects/${subject.toLowerCase().replaceAll(' ', '_')}/1`)
        }
    }

    return (
        <form className={style.form} onSubmit={submitHandler}>
            <label className={style.label} htmlFor="subject">Subject</label>
            <input
                placeholder="Search books by subject"
                className={style.input}
                value={subject}
                onChange={subjectChangeHandler}
                type="text"
                name="subject"
                id="subject"
            />
            <button className={style.btn} type="submit">Search</button>
        </form>
    )
}

export default SearchForm;