import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "../../pages/Login/Login";
import { baseUrl } from "../../modules/data";

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
      fetch(`${baseUrl}client/getuser`, {
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
    localStorage.setItem("token", "");
    navigate("/");
  };

  const handShake = async () => {
    try {
      const response = await (
        await fetch(`${baseUrl}client/handshake`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).json();
      return response.result;
    } catch (error) {}
  };

  return { token, user, handleLogin, handleLogout, handShake };
}

export const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

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
