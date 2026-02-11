import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ValentinePage from './ValentinePage';
import MemoriesPage from './MemoriesPage';
import VaultPage from './VaultPage'; // The new vault page
import QuizPage from './QuizPage';
import FirstPhotoPage from './FirstPhotoPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ValentinePage />} />
        <Route path="/memories" element={<MemoriesPage />} />
        <Route path="/vault" element={<VaultPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/first-photo" element={<FirstPhotoPage />} />
      </Routes>
    </Router>
  );
}

export default App;