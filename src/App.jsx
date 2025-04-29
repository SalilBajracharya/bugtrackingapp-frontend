import { Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './pages/login/LoginPage'
import { Toaster } from 'react-hot-toast';
import BugPage from './pages/bugs/BugPage';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/bugs" element={<BugPage />} />
    </Routes>
    <Toaster />
    </>
  );
}

export default App;
