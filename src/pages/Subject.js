import { Fragment, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Books from "../components/Books";
import Pagination from '../components/Pagination';
import Spinner from "../components/Spinner";
import NotFound from "../components/NotFound";
import style from './Subject.module.css';

const Subject = () => {

    const [books, setBooks] = useState([]);
    const [bookCount, setBookCount] = useState('')
    const [loading, setLoading] = useState(true);

    const { subject, page } = useParams();

    const booksPerPage = 12;

    const fetchBooks = useCallback(async () => {
        try {
            const offset = (page - 1) * 12;
            const response = await axios.get(
                `https://openlibrary.org/subjects/${subject}.json?limit=${booksPerPage}&offset=${offset}`
            );
            setBooks(response.data.works);
            setBookCount(response.data.work_count);
        } catch (e) {
            console.log('Something went wrong');
        } finally {
            setLoading(false);
        }
    }, [subject, page]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    if (loading) {
        return <Spinner />
    }

    if (!loading && !books.length) {
        return <NotFound
            message="Could not find any books on that subject. Sorry!"
        />
    }

    return (
        <Fragment>
            <h1 className={style.heading}>{subject.replaceAll('_', ' ')}</h1>
            {bookCount && <p className={style.count}>Books on this subject: {bookCount.toLocaleString()}</p>}
            <Pagination
                subject={subject}
                bookCount={bookCount}
                booksPerPage={booksPerPage}
                currentPage={page}
            />
            <Books
                books={books}
                subject={subject}
            />
        </Fragment>
    )
}

export default Subject;