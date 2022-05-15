import BookCard from './BookCard';
import styles from './Books.module.css';

const Books = props => {

    return (
        <div className={styles.books}>
            {props.books.map(book => (
                <BookCard key={book.key} book={book} />
            ))}
        </div>
    )
}

export default Books;