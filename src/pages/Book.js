import React, { Fragment } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import style from './Book.module.css';

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search])
}

const Book = () => {
    const query = useQuery();

    const olid = query.get("olid");
    const workid = query.get("workid");

    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchBookDetails = useCallback(async () => {
        try {
            const booksEndpoint = `https://openlibrary.org/api/books?bibkeys=OLID:${olid}&format=json&jscmd=data`
            const booksResponse = await axios.get(booksEndpoint);
            const book = booksResponse.data[`OLID:${olid}`];

            const worksEndpoint = `https://openlibrary.org/works/${workid}.json`
            const worksResponse = await axios.get(worksEndpoint);
            const description = worksResponse.data.description;

            if (typeof description === 'string'){
                book.description = description;
            } else if (
                typeof description === 'object' &&
                !Array.isArray(description)
            ){
                book.description = description.value;
            }
            console.log(book.description);
            setBook(book);
        } catch (e) {
            console.log('Something went wrong')
        } finally {
            setLoading(false);
        }
    }, [olid, workid]);

    useEffect(() => {
        fetchBookDetails();
    }, [fetchBookDetails]);

    if (loading) {
        return <p>Loading...</p>
    }

    if (!loading && !Object.keys(book).length) {
        return <p>Could not find the requested book. Sorry!</p>
    }

    const authors = book.authors.map(author => author.name).join(',');

    return (
        <Fragment>
            <h1 className={style['book__title']}>{book.title}</h1>
            <p className={style['book__authors']}>{authors}</p>
            <div className={style.book}>
                <div>
                    {<img src={book.cover.large} alt={`${book.title} cover`} />}
                </div>
                <div className={style['book__info']}>
                    {book.description && <p className={style['book__description']}>{book.description}</p>}
                    <h3>Subjects</h3>
                    <ul>
                        {book.subjects && book.subjects.map((subject, index) => (
                            <li key={index}>
                                <Link to={'/subjects/' + subject.name.toLowerCase().replaceAll(' ', '_')}>
                                    {subject.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export default Book;