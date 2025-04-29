import { Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './pages/login/LoginPage'
import { Toaster } from 'react-hot-toast';
import BugPage from './pages/bugs/BugPage';
import RegisterPage from './pages/login/Register';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/bugs" element={<BugPage />} />
    </Routes>
    <Toaster />
    </>
  );
}

export default App;
