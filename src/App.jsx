import { Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './pages/LoginPage'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
    <Toaster />
    </>
  );
}

export default App;
