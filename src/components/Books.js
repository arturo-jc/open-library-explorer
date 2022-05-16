import BookCard from './BookCard';
import Spinner from './Spinner';
import styles from './Books.module.css';

const Books = props => {
    
    if (props.loading) {
        return <Spinner />
    }

    return (
        <div className={styles.books}>
            {props.books.map(book => (
                <BookCard key={book.key} book={book} />
            ))}
        </div>
    )
}

export default Books;