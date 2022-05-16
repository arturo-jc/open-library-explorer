import { NavLink } from "react-router-dom";
import style from './Pagination.module.css'

const Pagination = props => {
    const numOfPageBtns = 3;
    const currentPage = parseInt(props.currentPage);
    const pagesTotal = Math.ceil(props.bookCount / props.booksPerPage)
    const pageGroup = Math.ceil(currentPage / numOfPageBtns);

    const getFirstPage = (pageGroup) => {

        const memo = {}

        const helper = pageGroup => {
            if(memo.pageGroup) return memo.pageGroup;
            if (pageGroup === 1) return 1;
            const result = getFirstPage(pageGroup - 1) + numOfPageBtns;
            memo.pageGroup = result
            return result;
        }

        return helper(pageGroup);
    }

    const firstPage = getFirstPage(pageGroup);
    const adjacentPages = [firstPage];

    let additions = 0;
    let current = firstPage;
    while (additions < (numOfPageBtns - 1) && current < pagesTotal) {
        adjacentPages.push(current + 1);
        additions++;
        current++;
    }

    const activeStyle = {
        backgroundColor: 'rgb(214, 212, 212)',
    }

    const prevBtn = currentPage === 1 ? (<li className={style.disabled}>{'<<'}</li>) : (
        <li>
            <NavLink activeStyle={activeStyle} to={`/subjects/${props.subject}/${currentPage - 1}`}>{'<<'}</NavLink>
        </li>
    )

    const nextBtn = currentPage === pagesTotal ? (<li className={style.disabled}>{'>>'}</li>) : (
        <li>
            <NavLink activeStyle={activeStyle} to={`/subjects/${props.subject}/${currentPage + 1}`}>{'>>'}</NavLink>
        </li>
    )

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