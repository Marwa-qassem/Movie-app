import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavBar({ userData, logOut }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-transparent navbar-dark p-4 pb-0">
        <div className="container-fluid">
          <Link className="navbar-brand" to="home">
            Noxe
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link text-white text-white" to="home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="movies">
                    Movies
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="tv">
                    Tv show
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="people">
                    People
                  </NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex me-2">
                <a className="nav-link text-white" href="#">
                  <i className="fab fa-facebook"></i>
                </a>
                <a className="nav-link text-white" href="#">
                  <i className="fab fa-instgram"></i>
                </a>
                <a className="nav-link text-white" href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="nav-link text-white" href="#">
                  <i className="fab fa-spotify"></i>
                </a>
                <a className="nav-link text-white" href="#">
                  <i className="fab fa-youtube"></i>
                </a>
              </li>
              {userData ? (
                <li className="nav-item">
                  <div className="d-flex align-items-center">
                    <span className="nav-link text-white cursor-pointer" onClick={logOut}>Logout</span>
                    <Link className="nav-link text-white" to={'profile'}> Welcome {userData.first_name}
                    </Link>
                  </div>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white" to="login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white" to="register">
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
