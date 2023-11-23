import React from 'react';

// Product component to display individual products
const Product = ({ name, price, image }) => (
  <div className="product">
    <img src={image} alt={name} />
    <h3>{name}</h3>
    <p>${price}</p>
    <button>Add to Cart</button>
  </div>
);

// ProductList component to display a list of products
const ProductList = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Kirja 1',
      price: 10,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Kirja 2',
      price: 15,
      image: 'https://via.placeholder.com/150',
    },
    // Add more product objects as needed
  ];

  return (
    <div className="product-list">
      {products.map((product) => (
        <Product
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  );
};

// Main App component
const App = () => {
  return (
    <div className="app">
      <h1>Tervetuloa novellinurkkaan!</h1>
      <ProductList />
    </div>
  );
};

export default App;
