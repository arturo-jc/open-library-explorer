import { useState } from 'react';
import style from './BooksPerPageInput.module.css';

const BooksPerPageInput = props => {

    const [booksNum, setBooksNum] = useState(props.booksPerPage);

    const numberChangeHandler = event => {
        setBooksNum(event.target.value);
    }

    const submitHandler = event => {
        event.preventDefault();
        if (booksNum > 0 && booksNum <= 50){
            props.setBooksPerPage(booksNum);
        }
    }

    return(
        <form onSubmit={submitHandler} className={style.form}>
        <label className={style.label} htmlFor="booksPerPage">{'Books per page (50 max):'}</label>
        <input
            min='1'
            max='50'
            className={style.input}
            value={booksNum}
            onChange={numberChangeHandler}
            type="number"
            name="booksPerPage"
            id="booksPerPage"
        />
    </form>
    )
}

export default BooksPerPageInput;