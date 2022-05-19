import { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./SearchForm.module.css";

const SearchForm = () => {
    const [subject, setSubject] = useState("");

    const subjectChangeHandler = (event) => {
        setSubject(event.target.value);
    };

    let history = useHistory();

    const submitHandler = (event) => {
        event.preventDefault();
        if (!subject.trim().length) {
            console.log("Alert!");
        } else {
            history.push(
                `/subjects/${subject.trim().toLowerCase().replaceAll(" ", "_")}/1`
            );
        }
        setSubject("");
    };

    return (
        <form className={style.form} onSubmit={submitHandler}>
            <label className={style.label} htmlFor="subject">
                Subject
            </label>
            <input
                placeholder="Search books by subject"
                className={style.input}
                value={subject}
                onChange={subjectChangeHandler}
                type="text"
                name="subject"
                id="subject"
            />
            <button className={style.btn} type="submit">
                Search
            </button>
        </form>
    );
};

export default SearchForm;
