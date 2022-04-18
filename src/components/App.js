import React, { Component } from 'react';
import Header from './Header'
import ProductsList from './ProductList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] }
  }
  async componentDidMount() {
    const result = await (await fetch('http://127.0.0.1:8000/getProducts')).json()
    this.setState({ products: result.produits })
  }
  render() {
    return (
      <>
        <Header />
        <main>
          <ProductsList products={this.state.products} />
        </main>

      </>
    );
  }
}

export default App;
