import style from './BookThumbnail.module.css'

const BookThumbnail = props => {

    let backgroundStyle = {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        height: '18rem',
        width: '100%',
        backgroundImage: `linear-gradient(to right bottom, rgba(255, 255, 255, 0.5), rgba(200, 200, 200, 0.5)), url(${props.cover})`,
        backgroundSize: 'cover',
        filter: 'blur(5px)',
        overflow: 'hidden'
    }

    return (
        <div className={style.wrapper}>
            <div style={backgroundStyle}>
            </div>
            <img className={style.thumbnail} src={props.cover} alt={`${props.title} cover`} />
        </div>
    )

}

export default BookThumbnail;