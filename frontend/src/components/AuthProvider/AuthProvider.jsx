import { useState, createContext, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Logout from "../Logout/Logout";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(null);

  const handleLogin = async (newToken) => {
    setToken(newToken);

    const origin = location.state?.from?.pathname || "/profile";
    navigate(origin);
  };

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export const ProtectedRoute = ({ children }) => {
  const { token, onLogin, onLogout } = useAuth();
  const location = useLocation();

  if (location.pathname === "/logout") {
    return <Logout onLogout={onLogout} onUser={children.props.onUser} />;
  }

  if (!token) {
    return (
      <Login
        onLogin={onLogin}
        onUser={children.props.onUser}
        to="/"
        replace
        state={{ from: location }}
      />
    );
  }

  if (token && location.pathname === "/login") {
    return <Login isLogged={true} />;
  }
  return children;
};
