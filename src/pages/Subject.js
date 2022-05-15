import { Fragment, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Books from "../components/Books";
import style from './Subject.module.css';

const Subject = () => {

    const [books, setBooks] = useState([]);
    const [bookCount, setBookCount] = useState('')
    const [loading, setLoading] = useState(true);

    const { subject } = useParams();

    const fetchBooks = useCallback(async () => {
        try {
            const response = await axios.get(`https://openlibrary.org/subjects/${subject}.json`);
            console.log(response.data);
            setBooks(response.data.works);
            setBookCount(response.data.work_count);
        } catch (e) {
            console.log('Something went wrong');
        } finally {
            setLoading(false);
        }
    }, [subject]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    if (loading) {
        return <p>Loading...</p>
    }
    if (!loading && !books.length) {
        return <p>Could not find any books on that subject. Sorry!</p>
    }

    return (
        <Fragment>
            <h1 className={style.heading}>{subject.replaceAll('_', ' ')}</h1>
            {bookCount && <p className={style.count}>Number of books on this subject: {bookCount}</p>}
            <Books books={books} subject={subject} />
        </Fragment>
    )
}

export default Subject;