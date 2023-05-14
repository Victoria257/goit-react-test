import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home/Home';
import Tweets from './pages/Tweets/Tweets';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/tweets" element={<Tweets />}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
