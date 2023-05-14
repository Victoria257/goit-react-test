import { NavLink } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <NavLink to="/tweets">Tweets</NavLink>
      <h2>Home</h2>
    </div>
  );
};
