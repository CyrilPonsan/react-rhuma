import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ProductsList from "../../components/ProductList";
import { fetchPromise } from "../../utils/modules/fetchModule";

function Home() {
  const [produits, updateProduits] = useState([]);

  useEffect(() => init(), []);

  const init = () => {
    fetchPromise("getproduits").then(({ produits }) => {
      updateProduits(produits);
      console.log(produits);
    });
  };

  /* 
  async componentDidMount() {
    const result = await (
      await fetch(`http://127.0.0.1:${this.state.port}/api/getproduits`)
    ).json();
    this.setState({ products: result.produits });
  } */

  return (
    <>
      <Header />
      <main>
        <ProductsList products={produits} />
      </main>
    </>
  );
}

export default Home;
