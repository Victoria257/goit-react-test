import { useDispatch, useSelector } from 'react-redux';
import { TweetsList } from '../../components/TweetsList/TweetsList';
import { useEffect } from 'react';
import { fetchUsers } from '../../redux/operations';
import { incrementPrevPage } from 'redux/slice';

const Tweets = () => {
  const dispatch = useDispatch();
  const page = useSelector(state => state.users.page);
  const limit = useSelector(state => state.users.users.limit);
  const prevPage = useSelector(state => state.users.prevPage);

  useEffect(() => {
    if (page !== prevPage) {
      dispatch(fetchUsers({ page, limit }));
      dispatch(incrementPrevPage(page));
    }
  }, [dispatch, page, prevPage, limit]);

  return (
    <div>
      <TweetsList />;
    </div>
  );
};

export default Tweets;
