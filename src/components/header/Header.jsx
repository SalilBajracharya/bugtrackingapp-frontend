import { Link, useNavigate } from "react-router-dom";
import "./header.css"; 
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice"; 

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    dispatch(logout());
    navigate("/"); 
  };

  return (
    <header className="header">
      <nav className="nav">
        <h1 className="logo">Bug Tracker</h1>
        <ul className="nav-links">
          <li><Link to="/bugs">Bugs</Link></li>
          <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
