const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:3001/books');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

const getProductData = async () => {
    const data = await fetchData();
    return data.map(product => ({
        id: product.product_id,
        title: product.title,
        price: product.price,
        img: product.img_url
    }));
};

export default getProductData;