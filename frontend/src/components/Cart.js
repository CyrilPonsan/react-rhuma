import '../css/Cart.css'

function Cart({ cart, updateCart }) {

    return (
        <div>
            <ul>
                {
                    cart.map(({ nom, quantite, prix }, index) => {
                        return (
                            <li key={`${nom}-${index}`}>
                                <div>
                                    <span>
                                        {nom} x {quantite}
                                    </span>
                                    <span>
                                        {(quantite * prix).toFixed(2)} €
                                    </span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Cart