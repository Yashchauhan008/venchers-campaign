import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAuthenticated, logout } = useKindeAuth();

  return (
    <nav className="nav">
      <img className="logo" src="#" alt="Logo" />
      {location.pathname !== "/upload" && (
        <>
          {isAuthenticated ? (
            <button onClick={() => navigate("/upload")}>Upload</button>
          ):
          <div>
            <button onClick={register}>Register</button>
            <button onClick={login} type="button">
              Log In
            </button>
          </div>
        }
        </>
      )}
      {location.pathname == "/upload" && (
        <button onClick={logout}>log out</button>
      )}
    </nav>
  );
};

export default Navbar;
