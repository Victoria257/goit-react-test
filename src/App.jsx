import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home/Home';
import Users from './pages/Users/Users';

function App() {
  return (
    <>
      <div>
        {/* <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/tweets">Tweets</NavLink>
        </nav> */}

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/tweets" element={<Users />}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
