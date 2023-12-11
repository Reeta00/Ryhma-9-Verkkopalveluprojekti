
import React from "react";
import { Product } from "./Product";


export const Home = (props) => {

    const { product, onAdd } = props;

    return (
        <div>

            <Product product={product} onAdd={onAdd} />

        </div>
    );
};
