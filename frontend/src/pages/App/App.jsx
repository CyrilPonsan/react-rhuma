import "./App.css";
import Header from "../../components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Catalogue from "../Catalogue/Catalogue";
import { useEffect, useState } from "react";
import { setNbArticles, setTotal, sortCart } from "../../modules/sortArray";
import { fetchPromise } from "../../modules/fetchModule";
import { baseUrl } from "../../modules/data.js";
import Cart from "../../components/Cart/Cart";

function App() {
  const savedCart = localStorage.getItem("cart");
  const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : []);
  const [produits, setProduits] = useState([]);
  const [displayCart, updateDisplayCart] = useState(false);
  const [nbArticles, updateNbArticles] = useState(0);
  const [total, updateTotal] = useState(0);

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

  const handleToggleCart = () => {
    updateDisplayCart(!displayCart);
  };

  return (
    <BrowserRouter>
      {displayCart && (
        <section className="cart">
          <Cart
            cart={cart}
            total={total}
            onOrderCart={handleOrderCart}
            onResetCart={handleResetCart}
            onToggleCart={handleToggleCart}
          />
        </section>
      )}
      <Header nbArticles={nbArticles} onToggleCart={handleToggleCart} />
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
