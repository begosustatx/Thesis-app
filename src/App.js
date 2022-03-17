import logo from './logo.svg';
//import './App.css';

import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import Main from './componets/main'
import Sentence from './componets/sentence_level'
import Word from './componets/word_level'
import Test from './componets/test'
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/word" element={<Word />} />
        <Route exact path="/sentence" element={<Sentence />} />
        <Route exact path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
