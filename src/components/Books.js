import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import BookCard from './BookCard';

const Books = props => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBooks = useCallback(async () => {
        try {
            const response = await axios.get(`https://openlibrary.org/subjects/${props.subject}.json`);
            setBooks(response.data.works);
            setLoading(false);
        } catch (e) {
            console.log('Something went wrong');
            console.log(e);
        }
    }, [props]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    if (loading) {
        return <p>Loading...</p>
    }
    if (!loading && !books.length) {
        return <p>There are no books on that subject.</p>
    }

    return (
        <div>
            {books.map(book => (
                <Link key={book.key} to={`/books/${book.cover_edition_key}`}>
                    <BookCard book={book} />
                </Link>
            ))}
        </div>
    )
}

export default Books;