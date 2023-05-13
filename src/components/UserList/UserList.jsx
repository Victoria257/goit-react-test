import { useDispatch, useSelector } from 'react-redux';
import css from './UserList.module.css';
import Logo from 'assets/icons/logo.svg';
import ELlipse from 'assets/icons/ellipse.png';
import { useEffect } from 'react';
import { incrementPage, setFollowersCount, setNameButton } from 'redux/slice';

export const UsersList = () => {
  const dispatch = useDispatch();
  const formatter = new Intl.NumberFormat('en-US');

  const users = useSelector(state => state.users.users.items);
  const hasNextPage = useSelector(state => state.users.users.hasNextPage);
  const nameButton = useSelector(state => state.users.nameButton);
  const followersCount = useSelector(state => state.users.followersCount);

  useEffect(() => {
    console.log(users);
    const initialFollowersCount = users.reduce(
      (acc, { id, followers }) => ({ ...acc, [id]: followers }),
      {}
    );
    console.log(users);
    console.log(initialFollowersCount);
    dispatch(setFollowersCount(initialFollowersCount));
    console.log(followersCount);
  }, [users, dispatch, followersCount]);

  const toggleClick = id => {
    dispatch(
      setFollowersCount({
        ...followersCount,
        [id]: nameButton[id] ? followersCount[id] - 1 : followersCount[id] + 1,
      })
    );

    dispatch(
      setNameButton({
        ...nameButton,
        [id]: !nameButton[id],
      })
    );
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
              <span>{formatter.format(followersCount[id])}</span>
              Followers
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
