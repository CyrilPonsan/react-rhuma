import Produit from "../../components/Produit/Produit";
import "./Catalogue.css";

function Catalogue({ produits, onAddToCart }) {
  return (
    <main>
      <section>
        <article className="cat-article">
          {produits.map((produit) => {
            return (
              <div key={`${produit.id}-${produit.nom}`}>
                <Produit produit={produit} />
                <div>
                  <button
                    className="button"
                    onClick={() =>
                      onAddToCart(produit.id, produit.nom, produit.prix)
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </article>
      </section>
    </main>
  );
}

export default Catalogue;
