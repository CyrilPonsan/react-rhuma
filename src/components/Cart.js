import ProductsList from "./ProductList";

function Cart({ cart, updateCart }) {
    console.log('cart', cart);
    return (
        <div>
            <ul>
                {
                    cart.map(({ nom, quantite }, index) => {
                        return (
                            <li key={`${nom}-${index}`}>
                                {nom} x {quantite}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Cart