import style from './FilterInput.module.css';

const FilterInput = props => {

    const filterChangeHandler = event => {
        props.setFilterCondition(event.target.value);
    }

    return(
        <form className={style.form}>
        <label className={style.label} htmlFor="filter">Filter page results by title or author</label>
        <input
            placeholder="Filter page results"
            className={style.input}
            value={props.filterCondition}
            onChange={filterChangeHandler}
            type="text"
            name="filter"
            id="filter"
        />
    </form>
    )
}

export default FilterInput;