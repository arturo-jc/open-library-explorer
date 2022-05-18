import { NavLink } from "react-router-dom";
import style from './Pagination.module.css'
import { ReactComponent as Forward } from '../forward.svg';
import { ReactComponent as Back } from '../back.svg';

const Pagination = props => {
    const numOfPageBtns = 4;
    const currentPage = parseInt(props.currentPage);
    const pagesTotal = Math.ceil(props.bookCount / props.booksPerPage)
    const pageGroup = Math.ceil(currentPage / numOfPageBtns);
    const firstPageOfGroup = (pageGroup * (numOfPageBtns - 1)) + (pageGroup - (numOfPageBtns - 1));
    
    const adjacentPages = [firstPageOfGroup];
    let pageBtns = adjacentPages.length;
    let current = firstPageOfGroup;
    while (pageBtns < numOfPageBtns && current < pagesTotal) {
        adjacentPages.push(current + 1);
        pageBtns++;
        current++;
    }

    const activeStyle = {
        backgroundColor: 'rgb(214, 212, 212)',
    }

    const prevBtn = currentPage === 1 ?
        (<li className={style.disabled}>
            <Back className={style.icon}/>
        </li>)
        :
        (<li>
            <NavLink activeStyle={activeStyle} to={`/subjects/${props.subject}/${currentPage - 1}`}>
                <Back className={style.icon}/>
            </NavLink>
        </li>)

    const nextBtn = currentPage === pagesTotal ?
        (<li className={style.disabled}>
            <Forward className={style.icon}/>
        </li>) :
        (<li>
            <NavLink activeStyle={activeStyle} to={`/subjects/${props.subject}/${currentPage + 1}`}>
                <Forward className={style.icon}/>
            </NavLink>
        </li>)

    return (
        <ul className={style['btn-group']}>
            <li>
                <NavLink activeStyle={activeStyle} to={`/subjects/${props.subject}/1`}>First</NavLink>
            </li>
            {prevBtn}
            {adjacentPages.map(page => (
                <li key={page}>
                    <NavLink activeStyle={activeStyle} to={`/subjects/${props.subject}/${page}`}>{page}</NavLink>
                </li>
            ))}
            {nextBtn}
            <li>
                <NavLink activeStyle={activeStyle} to={`/subjects/${props.subject}/${pagesTotal}`}>Last</NavLink>
            </li>
        </ul>
    )
}

export default Pagination;