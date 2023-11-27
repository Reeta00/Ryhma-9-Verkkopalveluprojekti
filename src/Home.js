import React from 'react';
// Product component to display individual products

export const Product = ({ name, price, image }) => (
    <div className="product">
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>${price}</p>
        <button>Add to Cart</button>
    </div>
);

// ProductList component to display a list of products
export const ProductList = () => {
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
            <h2>Tervetuloa Novellinurkkaan!</h2>
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