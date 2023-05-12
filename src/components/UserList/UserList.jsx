import { useDispatch, useSelector } from 'react-redux';
import css from './UserList.module.css';
import Logo from 'assets/icons/logo.svg';
import ELlipse from 'assets/icons/ellipse.png';
import { useEffect, useState } from 'react';
import { incrementPage } from 'redux/slice';

export const UsersList = () => {
  const dispatch = useDispatch();
  const formatter = new Intl.NumberFormat('en-US');

  const users = useSelector(state => state.users.users.items);
  const hasNextPage = useSelector(state => state.users.users.hasNextPage);
  // const total = useSelector(state => state.users.users.total);
  // const limit = useSelector(state => state.users.users.limit);
  // const page = useSelector(state => state.users.users.page);

  // const lastPage = total / limit;

  const [nameButton, setNameButton] = useState({});
  const [followersCount, setFollowersCount] = useState({});

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('nameButton', JSON.stringify(nameButton));
      localStorage.setItem('followersCount', JSON.stringify(followersCount));
    }
  }, [nameButton, followersCount, users.length]);

  useEffect(() => {
    if (users.length > 0) {
      const count = JSON.parse(localStorage.getItem('followersCount')) || null;
      const name = JSON.parse(localStorage.getItem('nameButton')) || null;
      console.log(count);
      console.log(name);
      // console.log(users);
      if (count) {
        setFollowersCount(count);
      } else {
        const initialFollowersCount = users.reduce(
          (acc, { id, followers }) => ({ ...acc, [id]: followers }),
          {}
        );
        setFollowersCount(initialFollowersCount);
      }

      if (name) {
        setNameButton(name);
      } else {
        setNameButton({ 1: false });
      }
    }
  }, [users]);

  const toggleClick = id => {
    setFollowersCount({
      ...followersCount,
      [id]: nameButton[id] ? followersCount[id] - 1 : followersCount[id] + 1,
    });

    setNameButton({
      ...nameButton,
      [id]: !nameButton[id],
    });
  };

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  return (
    <div>
      <ul className={css.list}>
        {users.map(({ user, tweets, id, followers, avatar }) => (
          <li id={id} key={id} className={css.item}>
            <div className={css.thumbLogo}>
              <img
                src={Logo}
                alt="logo"
                className={css.Logo}
                width={76}
                height={22}
              ></img>
            </div>
            <img
              src={ELlipse}
              alt="ELlipse"
              width={80}
              height={80}
              className={css.ellipse}
            />
            <div className={css.thumbAvatar}>
              <img
                className={css.avatar}
                src={avatar}
                alt={`${user}'s avatar`}
                title={user}
                width={62}
                height={62}
              ></img>
            </div>

            <p className={css.tweets}>
              <span>{formatter.format(tweets)}</span> Tweets
            </p>
            <p className={css.followers}>
              <span>{formatter.format(followersCount[id])}</span> Followers
            </p>
            <button
              type="button"
              onClick={() => toggleClick(id)}
              className={`${css.button} ${
                nameButton[id] ? css.buttonFollowing : ''
              }`}
            >
              {nameButton[id] ? 'following' : 'Follow'}
            </button>
          </li>
        ))}
      </ul>
      {users && hasNextPage && (
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
