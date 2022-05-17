import { Fragment, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Books from "../components/Books";
import Pagination from '../components/Pagination';
import FilterInput from "../components/FilterInput";
import BooksPerPageInput from "../components/BooksPerPageInput";
import NotFound from "../components/NotFound";
import style from './Subject.module.css';

const Subject = () => {

    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const [bookCount, setBookCount] = useState('');
    const [filterCondition, setFilterCondition] = useState('');
    const [booksPerPage, setBooksPerPage] = useState(12);

    const { subject, page } = useParams();

    const fetchBooks = useCallback(async () => {
        try {
            setFilterCondition('');
            setLoading(true);
            const offset = (page - 1) * booksPerPage;
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
    }, [subject, page, booksPerPage]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    if (!loading && !books.length) {
        return <NotFound
            message="Could not find any books on that subject. Sorry!"
        />
    }

    const filteredBooks = books.filter(book => {
        const authors = book.authors.map(author => author.name).join(' ');
        return (book.title + authors).toLowerCase().includes(filterCondition.toLowerCase());
    })

    return (
        <Fragment>
            <h1 className={style.heading}>{subject.replaceAll('_', ' ')}</h1>
            <p className={style.count}>Books on this subject: {bookCount && bookCount.toLocaleString()}</p>
            <BooksPerPageInput booksPerPage={booksPerPage} setBooksPerPage={setBooksPerPage} />
            <Pagination
                subject={subject}
                bookCount={bookCount}
                booksPerPage={booksPerPage}
                currentPage={page}
            />
            <FilterInput filterCondition={filterCondition} setFilterCondition={setFilterCondition} />
            <Books
                loading={loading}
                books={filteredBooks}
            />
        </Fragment>
    )
}

export default Subject;