
const BookCard = props => {

    const cover = `https://covers.openlibrary.org/b/id/${props.book.cover_id}-M.jpg`;

    return (
        <div>
            <h3>{props.book.title}</h3>
            {props.book.authors && <h3>{props.book.authors.map(author => author.name).join(' ')}</h3>}
            <img src={cover} />
        </div>
    )
};

export default BookCard;