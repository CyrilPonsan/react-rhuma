import React, { Component } from 'react';
import Header from './Header'
import ProductsList from './ProductList';
import Produit from './Produit';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] }
  }
  async componentDidMount() {
    const result = await (await fetch('http://127.0.0.1:8000/getProducts')).json()
    this.setState({products: result.produits})
    console.log('tata', this.state.products);
  }
  render() {
    return (
      <div>
        <Header />
        <h1>Toto</h1>
        <ProductsList products={this.state.products} />
      </div>
    );
  }
}

export default App;
