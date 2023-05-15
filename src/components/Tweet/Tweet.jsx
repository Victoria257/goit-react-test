import css from './Tweet.module.css';
import Logo from 'assets/icons/logo.svg';
import Ellipse from 'assets/icons/ellipse.png';
import { useDispatch, useSelector } from 'react-redux';
import { setNameButton } from 'redux/slice';

export const Tweet = () => {
  const nameButton = useSelector(state => state.users.nameButton);
  const filterTweets = useSelector(state => state.filterTweets.filters);
  const users = useSelector(state => state.users.users.items);

  const dispatch = useDispatch();

  const formatter = new Intl.NumberFormat('en-US');

  const getVisibleUsers = () => {
    if (filterTweets === 'Follow') {
      return users.filter(({ id }) => nameButton[id] === true);
    } else if (filterTweets === 'Followings') {
      return users.filter(
        ({ id }) => !nameButton[id] || nameButton[id] === !true
      );
    } else return users;
  };

  const toggleClick = id => {
    dispatch(
      setNameButton({
        ...nameButton,
        [id]: !nameButton[id],
      })
    );
  };

  return getVisibleUsers().map(({ user, tweets, id, followers, avatar }) => (
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
        src={Ellipse}
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
        <span>
          {nameButton[id]
            ? formatter.format(followers + 1)
            : formatter.format(followers)}
        </span>{' '}
        Followers
      </p>
      <button
        type="button"
        onClick={() => toggleClick(id)}
        className={`${css.button} ${nameButton[id] ? css.buttonFollowing : ''}`}
      >
        {nameButton[id] ? 'following' : 'Follow'}
      </button>
    </li>
  ));
};
