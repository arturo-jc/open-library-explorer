import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import BookCard from './BookCard';
import styles from './Books.module.css';

const Books = props => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBooks = useCallback(async () => {
        try {
            const response = await axios.get(`https://openlibrary.org/subjects/${props.subject}.json`);
            console.log(response.data.works);
            setBooks(response.data.works);
        } catch (e) {
            console.log('Something went wrong');
        } finally {
            setLoading(false);
        }
    }, [props]);

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
        <div className={styles.books}>
            {books.map(book => (
                <BookCard key={book.key} book={book} />
            ))}
        </div>
    )
}

export default Books;