import "./App.css";
import Header from "../../components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Catalogue from "../Catalogue/Catalogue";
import { useEffect, useState } from "react";
import { setNbArticles, setTotal, sortCart } from "../../modules/sortArray";
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

function App() {
  const savedCart = localStorage.getItem("cart");
  const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : []);
  const [produits, setProduits] = useState([]);
  const [displayCart, updateDisplayCart] = useState(false);
  const [nbArticles, updateNbArticles] = useState(0);
  const [total, updateTotal] = useState(0);
  const [user, setUser] = useState({});

  useEffect(() => init(), []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateNbArticles(setNbArticles(cart));
    updateTotal(setTotal(cart));
  }, [cart]);

  const init = () => {
    fetchPromise("getproduits").then(({ produits }) => setProduits(produits));
    updateNbArticles(setNbArticles(cart));
    updateTotal(setTotal(cart));
  };

  const handleUser = (user) => {
    if (user) {
      setUser({ nom: user.nom });
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

  const handleOrderCart = async () => {
    if (cart.length > 0) {
      const data = new FormData();
      data.append("client", 1);
      data.append("cart", JSON.stringify(cart));
      const result = await (
        await fetch(`${baseUrl}setvente`, {
          method: "POST",
          body: data,
        })
      ).json();
      handleResetCart();
    } else {
      alert("Votre panier est vide");
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
          element={
            <Cart
              cart={cart}
              total={total}
              onOrderCart={handleOrderCart}
              onResetCart={handleResetCart}
            />
          }
        />
        <Route
          path="/"
          element={
            <Catalogue
              displayCart={displayCart}
              produits={produits}
              onAddToCart={handleAddToCart}
            />
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
              <Account />
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
      </Routes>
    </AuthProvider>
  );
}

export default App;
