import logo from './logo.svg';
//import './App.css';

import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'

import Main from './componets/main'
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
