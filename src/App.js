import logo from './logo.svg';
//import './App.css';
import Main from './componets/main'

import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'

import Sentence from './componets/sentence_level'
import Word from './componets/word_level'
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/word" element={<Word />} />
      </Routes>
    </Router>
  );
}

export default App;
