import React, { Component } from 'react';
import Header from './Header'
import ProductsList from './ProductList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], port: 8001 }
  }

  async componentDidMount() {
    const result = await (await fetch(`http://127.0.0.1:${this.state.port}/getProducts`)).json()
    this.setState({ products: result.produits })
  }

  render() {
    return (
      <>
        <Header />
        <main>
          <ProductsList products={this.state.products} port={this.state.port} />
        </main>

      </>
    );
  }
}

export default App;
