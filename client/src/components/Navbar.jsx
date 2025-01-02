import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../useManager/authContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="navbar-container">
      <Link to={'/'}>Welcome {user ? user.username : 'Guest'}</Link>
      <div>
        {user ? (
          <>
            <Link to={'/profile'}>Profile</Link>
            <button onClick={() => {
              logout()
              navigate("/")
            }}>Logout</button>
          </>
        ) : (
          <>
            <Link to={'/login'}>
              <button>Login</button>
            </Link>
            <Link to={'/register'}>
              <button>Register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
