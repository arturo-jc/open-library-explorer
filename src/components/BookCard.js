import { Link } from 'react-router-dom';
import BookThumbnail from './BookThumbnail';
import styles from './BookCard.module.css';

const BookCard = props => {

    let title = props.book.title;
    let authors = `By ${props.book.authors.map(author => author.name).join(' ')}`
    const workdid = props.book.key.split('/')[2]
    const olid = props.book.cover_edition_key || props.book.lending_edition;

    const maxTitleLength = 35;
    const maxAuthorLength = 35;

    if (title.length > maxTitleLength) {
        title = `${title.substring(0, maxTitleLength - 1)}...`
    }

    if (authors.length > maxAuthorLength) {
        authors = `${authors.substring(0, maxAuthorLength - 1)}...`
    }

    const cover = `https://covers.openlibrary.org/b/id/${props.book.cover_id}-M.jpg`;

    return (
        <Link to={`/books?olid=${olid}&workid=${workdid}`}>
            <div className={styles['book-card']}>
                <BookThumbnail title={title} cover={cover} />
                <div className={styles['book-card__info']}>
                    <h3 className={styles['book-card__title']}>{title}</h3>
                    <p className={styles['book-card__authors']}>{props.book.authors && authors}</p>
                </div>
            </div>
        </Link>
    )
};

export default BookCard;