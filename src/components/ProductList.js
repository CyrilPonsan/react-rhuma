import { useState } from "react";
import Cart from "./Cart";
import Produit from "./Produit";

function ProductsList(props) {
    const [cart, updateCart] = useState([])

    function addToCart(nom) {
        console.log('nom', nom);
        const productInCart = cart.find((product) => product.nom === nom)
        if (productInCart) {
            const filteredProductInCart = cart.filter((product) => product.nom !== nom)
            updateCart([
                ...filteredProductInCart, {
                nom,
                quantite: productInCart.quantite + 1
            }])
        } else {
            updateCart([...cart, {nom, quantite: 1}])
            //console.log('cart', cart);
        }
    }

    return (
        <div>
            {
                props.products.map((product) => {
                    return (
                        <div>
                            <Produit key={product.id + '-' + product.nom} product={product} cart={cart} updateCart={updateCart} />
                            <button onClick={() => addToCart(product.nom)}>Add to Cart</button>
                        </div>
                    )
                })
            }
            <Cart cart={cart} updateCart={updateCart} />
        </div>

    )
}

export default ProductsList