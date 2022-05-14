import BookThumbnail from './BookThumbnail';
import styles from './BookCard.module.css';

const BookCard = props => {

    const cover = `https://covers.openlibrary.org/b/id/${props.book.cover_id}-M.jpg`;
    const authors = `By ${props.book.authors.map(author => author.name).join(' ')}`
    
    return (
        <div className={styles['book-card']}>
            <BookThumbnail cover={cover} />
            <div className={styles['book-card__info']}>
            <h3>{props.book.title}</h3>
            {props.book.authors && authors}
            </div>
        </div>
    )
};

export default BookCard;