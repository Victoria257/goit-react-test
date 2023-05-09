import { useDispatch, useSelector } from 'react-redux';
import { UsersList } from '../../components/UserList/UserList';
import { useEffect } from 'react';
import { fetchUsers } from '../../redux/operations';

export const Users = () => {
  const dispatch = useDispatch();
  const page = useSelector(state => state.users.users.page);
  const limit = useSelector(state => state.users.users.limit);

  useEffect(() => {
    dispatch(fetchUsers({ page, limit }));
  }, [dispatch, page, limit]);

  return <UsersList />;
};
