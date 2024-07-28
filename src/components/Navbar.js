import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  let location = useLocation();

  React.useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/"><button class="button" data-text="Awesome">
                  <span class="actual-text">&nbsp;Enotebook&nbsp;</span>
                  <span aria-hidden="true" class="hover-text">&nbsp;enotebook&nbsp;</span>
              </button>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? (
              <form className="d-flex" role="search">
                <Link className='custom-btn btn-1 mx-2' role='button' to="/login">Login</Link>
                <Link className='custom-btn btn-1 mx-2' role='button' to="/signup">SignUp</Link>
              </form>
            ) : (
              <button onClick={handleLogout} className='custom-btn btn-1 mx-2'>Log-out</button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
