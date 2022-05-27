import Produit from "../../components/Produit/Produit";
import "./Catalogue.css";

function Catalogue({ displayCart, produits, onAddToCart }) {
  return (
    <main>
      <section style={displayCart ? { opacity: 0 } : { opacity: 1 }}>
        <article>
          {produits.map((product) => {
            return (
              <div key={`${product.id}-${product.nom}`}>
                <Produit produit={product} />
                <div>
                  <button
                    className="button"
                    onClick={() =>
                      onAddToCart(product.id, product.nom, product.prix)
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
