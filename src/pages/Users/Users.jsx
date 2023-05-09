import { useDispatch, useSelector } from 'react-redux';
import { UsersList } from '../../components/UserList/UserList';
import { useEffect } from 'react';
import { fetchUsers } from '../../redux/operations';

export const Users = () => {
  const dispatch = useDispatch();
  const page = useSelector(state => state.users.users.page);

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  return <UsersList />;
};
