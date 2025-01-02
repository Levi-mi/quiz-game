import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../useManager/authContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="navbar-container">
      <Link to={'/'}>Logo(welcome User?)</Link>
      <div>
        {user ? (
          <>
            <Link to={'/profile'}>Profile</Link>
            <button onClick={logout}>Logout</button>
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
