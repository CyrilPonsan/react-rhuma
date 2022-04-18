import React, { Component } from 'react';

class Produit extends Component {
    constructor(props) {
        super(props);
        this.state = { product: this.props.product }
    }
    render() { 
        return (
            <div>
                <h2>{this.state.product.nom}</h2>
            </div>
        )
    }
}
 
export default Produit