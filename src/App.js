
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Main from './componets/main'
import HapticTraining from './componets/haptic-training'
import ReadTraining from './componets/reading-training'
import Menu from './componets/menu'

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response.json();
}

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Menu />} />
        <Route exact path="/toolkit" element={<Main postData={postData} />} />
        <Route exact path="/read-test" element={<ReadTraining postData={postData} />} />
        <Route exact path="/haptic-test" element={<HapticTraining postData={postData} />} />
      </Routes>
    </Router>
  );
}

export default App;
