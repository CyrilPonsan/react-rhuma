import React, { useEffect, useState } from "react";
import ProductsList from "../../components/ProductList";
import { fetchPromise } from "../../utils/modules/fetchModule";
import "./Home.css";

function Home() {
  const [produits, updateProduits] = useState([]);

  useEffect(() => init(), []);

  const init = () => {
    fetchPromise("getproduits").then(({ produits }) => {
      updateProduits(produits);
      console.log(produits);
    });
  };
  return (
    <main>
      <ProductsList products={produits} />
    </main>
  );
}

export default Home;
