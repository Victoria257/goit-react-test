import { useDispatch, useSelector } from 'react-redux';
import css from './TweetsList.module.css';
import { incrementPage } from 'redux/slice';
import { NavLink } from 'react-router-dom';
import FilterTweets from 'components/FilterTweets/FilterTweets';
import { Tweet } from 'components/Tweet/Tweet';

export const TweetsList = () => {
  const dispatch = useDispatch();

  const users = useSelector(state => state.users.users.items);
  const hasNextPage = useSelector(state => state.users.users.hasNextPage);
  const filterTweets = useSelector(state => state.filterTweets.filters);
  console.log(filterTweets);

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  return (
    <div>
      <div className={css.container}>
        <NavLink to="/">
          <button className={` ${css.buttonBack} ${css.button}`}>Back</button>
        </NavLink>
        <h1 className={css.title}>All your tweets</h1>
        <FilterTweets />
      </div>
      <ul className={css.list}>
        <Tweet />
      </ul>
      {users && hasNextPage && filterTweets === 'Show all' && (
        <button
          className={`${css.button} ${css.buttonLoadMore}`}
          type="button"
          onClick={handleLoadMore}
        >
          Load more..
        </button>
      )}
    </div>
  );
};
