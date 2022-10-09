import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import News from "./pages/News";
import Login from "./pages/Main/components/Login";
import { authLogout } from "./features/auth/authSlice";

import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);

  const logOut = useCallback(() => {
    dispatch(authLogout());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <header>
          <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
            <Link to="/">
              <h1 className="header header__main">Main</h1>
            </Link>
            <ul className="Navbar__ul">
              <li className="Navbar__ul">
                <Link className="header header__news" to="/news">
                  News
                </Link>
              </li>
              <li className="Navbar__li">
                <Link className="header header__profile" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="Navbar__li">
                {!isLogged ? (
                  <Link className="header header__login" to="/login">
                    Login
                  </Link>
                ) : (
                  <Link
                    className="header header__login"
                    onClick={logOut}
                    to="/login"
                  >
                    LogOut
                  </Link>
                )}
              </li>
            </ul>
          </Navbar>
        </header>

        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/news" element={<News />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
