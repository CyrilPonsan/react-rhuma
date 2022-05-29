import "./App.css";
import Header from "../../components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Catalogue from "../Catalogue/Catalogue";
import { useEffect, useState } from "react";
import { setNbArticles, sortCart } from "../../modules/sortArray";
import { fetchPromise } from "../../modules/fetchModule";
import { baseUrl } from "../../modules/data.js";
import Cart from "../Cart/Cart";
import {
  AuthProvider,
  ProtectedRoute,
} from "../../components/AuthProvider/AuthProvider";
import Account from "../Account/Account";
import Login from "../Login/Login";
import Logout from "../../components/Logout/Logout";
import Register from "../Register/Register";
import Order from "../Order/Order";

function App() {
  const savedCart = localStorage.getItem("cart");
  const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : []);
  const [produits, setProduits] = useState([]);
  const [nbArticles, updateNbArticles] = useState(0);
  const [user, setUser] = useState({});

  useEffect(() => init(), []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateNbArticles(setNbArticles(cart));
  }, [cart]);

  const init = () => {
    fetchPromise("getproduits").then(({ produits }) => setProduits(produits));
    updateNbArticles(setNbArticles(cart));
  };

  const handleUser = (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  };

  const handleAddToCart = (id, nom, prix) => {
    const isInCart = cart.find((article) => article.id === id);
    if (isInCart) {
      const newCart = cart.filter((article) => article.id !== id);
      updateCart(
        sortCart([
          ...newCart,
          { id, nom, prix, quantite: isInCart.quantite + 1 },
        ])
      );
    } else {
      updateCart(sortCart([...cart, { id, nom, prix, quantite: 1 }]));
    }
  };

  const handleResetCart = () => {
    updateCart([]);
  };

  return (
    <AuthProvider>
      <Header nbArticles={nbArticles} user={user} />
      <Routes>
        <Route
          path="/cart"
          element={<Cart cart={cart} onResetCart={handleResetCart} />}
        />
        <Route
          path="/"
          element={
            <Catalogue produits={produits} onAddToCart={handleAddToCart} />
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <Login onUser={handleUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Account user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout onUser={handleUser} />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <Order
                cart={cart}
                onUser={handleUser}
                user={user}
                onOrder={handleResetCart}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
