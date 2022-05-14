import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

const Book = () => {

    const { OLID } = useParams();

    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchBookDetails = useCallback(async () => {
        try {
            const baseUrl = `https://openlibrary.org/api/books?bibkeys=OLID:${OLID}&format=json`
            const response = await axios.get(baseUrl + '&jscmd=data');
            const book = response.data[`OLID:${OLID}`];
            setBook(book);
            setLoading(false);
        } catch (e) {
            console.log('Something went wrong')
        }
    }, [OLID]);

    useEffect(() => {
        fetchBookDetails();
    }, [fetchBookDetails])

    if (loading) {
        return <p>Loading...</p>
    }

    if (!loading && !Object.keys(book).length) {
        return <p>There are no books on that subject.</p>
    }

    return (
        <div>
            <h1>{book.title}</h1>
            <h2>{book.authors.map(author => author.name).join(',')}</h2>
            {<img src={book.cover.large} />}
            <h3>Subjects</h3>
            <ul>
                {book.subjects && book.subjects.map((subject, index) => (
                    <li key={index}>
                        <Link to={'/subjects/' + subject.name.toLowerCase().replaceAll(' ', '_')}>{subject.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Book;