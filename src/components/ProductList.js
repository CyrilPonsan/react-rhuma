import { useEffect, useState } from "react";
import Cart from "./Cart";
import Produit from "./Produit";
import '../css/ProductList.css'

function ProductsList(props) {
    const savedCart = localStorage.getItem('cart')
    const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : [])
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(id, nom, prix) {
        const productInCart = cart.find((product) => product.id === id)
        if (productInCart) {
            const filteredProductInCart = cart.filter((product) => product.id !== id)
            updateCart([
                ...filteredProductInCart, {
                    id,
                    nom,
                    quantite: productInCart.quantite + 1,
                    prix
                }])
        } else {
            updateCart([...cart, { id, nom, quantite: 1, prix }])
            //console.log('cart', cart);
        }
    }

    async function orderCart() {
        if (cart.length > 0) {
            const data = new FormData();
            data.append('client', 2)
            data.append('cart', JSON.stringify(cart))
            const result = await (await fetch('http://127.0.0.1:8000/setVente', {
                method: 'POST',
                body: data
            })).json()
            console.log('result', result);
            resetCart()
            console.log(cart);
        } else {
            alert("Le panier est vide")
        }
    }

    function resetCart() {
        updateCart([])
    }

    return (
        <>
            <section>
                <article>
                    {
                        props.products.map((product) => {
                            return (
                                <div key={`${product.id}-${product.nom}`}>
                                    <Produit product={product} />
                                    <button onClick={() => addToCart(product.id, product.nom, product.prix)}>Add to Cart</button>
                                </div>
                            )
                        })
                    }
                </article>
            </section>
            <section>
                <Cart cart={cart} updateCart={updateCart} />
                <div>
                    <button onClick={resetCart}>Vider</button>
                    <button onClick={orderCart}>Commander</button>
                </div>
            </section>
        </>

    )
}

export default ProductsList