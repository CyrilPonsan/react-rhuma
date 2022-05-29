import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUser } from "../../modules/fetchModule";
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
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (token) {
      fetch("http://127.0.0.1:8000/api/client/getuser", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((result) => setUser(result.user[0]));
    }
    let origin = location.state?.from?.pathname || "/";
    if (origin === "/register") {
      origin = "/";
    }

    navigate(origin);
  }, [token]);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken(null);
    setUser([]);
    navigate("/");
  };
  return { token, user, handleLogin, handleLogout };
}

export const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  //console.log("auth", auth);
  const location = useLocation();

  if (location.pathname === "/logout") {
    return (
      <Logout onLogout={auth.handleLogout} onUser={children.props.onUser} />
    );
  }

  if (!auth.token) {
    return (
      <Login
        cart={children.props.cart}
        onOrder={children.props.onOrder}
        to="/"
        replace
        state={{ from: location }}
      />
    );
  }
  return children;
};
