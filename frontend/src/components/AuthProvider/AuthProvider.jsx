import { useState, createContext, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Logout from "../Logout/Logout";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(null);

  const handleLogin = async (newToken) => {
    setToken(newToken);
    const origin = location.pathname;
    navigate(origin);
  };

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };
  return { token, handleLogin, handleLogout };
}

export const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  console.log("auth", auth);
  const location = useLocation();

  if (location.pathname === "/logout") {
    return (
      <Logout onLogout={auth.handleLogout} onUser={children.props.onUser} />
    );
  }

  if (!auth.token) {
    return (
      <Login
        onLogin={auth.handleLogin}
        onUser={children.props.onUser}
        cart={children.props.cart}
        token={auth.token}
        user={children.props.user}
        onOrder={children.props.onOrder}
        to="/"
        replace
        state={{ from: location }}
      />
    );
  }
  return children;
};
