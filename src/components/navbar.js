import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import '../index.css'

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAuthenticated, logout } = useKindeAuth();

  return (
    <nav className="nav">
      <h2 className="nav-text">own the piece of enjoyment 🥂</h2>
      {location.pathname !== "/upload" && (
        <>
          {isAuthenticated ? (
            // <button onClick={() => navigate("/upload")}>Upload</button>
            <button class="button" onClick={() => navigate("/upload")}>
              <span class="button-content">upload </span>
            </button>
          ) : (
            <div>
              <button class="button register_btn" onClick={register}>
              <span class="button-content">Register </span>
            </button>
            
            <button class="button" onClick={login}>
              <span class="button-content">Log In</span>
            </button>
            </div>
          )}
        </>
      )}
      {location.pathname === "/upload" && (
        <button class="button" onClick={logout}>
        <span class="button-content">Log out</span>
      </button>
      )}
    </nav>
  );
};

export default Navbar;
