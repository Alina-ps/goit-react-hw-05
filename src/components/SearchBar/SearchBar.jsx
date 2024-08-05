import s from './SearchBar.module.css';

const SearchBar = ({ filterValue, handleChangeFilter }) => {
  return (
    <div className={s.searchCotainer}>
      <input
        className={s.input}
        value={filterValue}
        placeholder="Search"
        type="search"
        onChange={(e) => handleChangeFilter(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
