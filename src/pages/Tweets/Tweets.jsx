import { useDispatch, useSelector } from 'react-redux';
import { TweetsList } from '../../components/TweetsList/TweetsList';
import { useEffect } from 'react';
import { fetchUsers } from '../../redux/operations';

const Tweets = () => {
  const dispatch = useDispatch();
  const page = useSelector(state => state.users.page);
  const limit = useSelector(state => state.users.users.limit);

  useEffect(() => {
    // dispatch(fetchUsersLength());
    dispatch(fetchUsers({ page, limit }));
  }, [dispatch, page, limit]);

  return (
    <div>
      <TweetsList />;
    </div>
  );
};

export default Tweets;
