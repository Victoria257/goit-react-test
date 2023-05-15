import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from 'redux/filterSlice';
import css from './FilterTweets.module.css';

const FilterTweets = () => {
  //   const filter = useSelector(state => state.filters);
  const dispatch = useDispatch();

  const filter = event => {
    dispatch(changeFilter(event.target.textContent));
  };

  return (
    <div className={css.dropdown}>
      <button className={css.dropButton}>Filter</button>
      <div className={css.dropdownContent} onClick={filter}>
        <a href="#">Show all</a>
        <a href="#">Follow</a>
        <a href="#">Followings</a>
      </div>
    </div>
  );
};

export default FilterTweets;
