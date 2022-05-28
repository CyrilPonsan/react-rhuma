import { useEffect, useState } from "react";
import { toTitleCase } from "../../modules/formatter";

function Produit(props) {
  const [produit, setProduit] = useState({});

  useEffect(() => {
    setProduit(props.produit);
  }, [props]);

  return (
    <div>
      <h2>{toTitleCase(produit.nom)}</h2>
      <img src={`img/${produit.url}`} alt={produit.nom} />
      <h3>{parseFloat(produit.prix).toFixed(2)} €</h3>
    </div>
  );
}

export default Produit;
