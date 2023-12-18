
import React, { useState, useEffect } from "react";
import { Product } from "./Product";
import { Login } from "./Login";
import axios from "axios";


export const Home = (props) => {

    const { cartItems, onAdd, product, onRemove } = props;
    const [loginStatus, setLoginStatus] = useState({ user_name: '' });

    useEffect(() => {
        axios.get('http://localhost:3001/login')
            .then((response) => {
                if (response.data.loggedIn === true) {
                    setLoginStatus({ user_name: response.data.user_name[0].user_name });
                }
            })
            .catch((error) => {
                console.error('Error checking login status:', error);
            });
    }, []);

    return (
        <div>
            <Product cartItems={cartItems} onAdd={onAdd} product={product} onRemove={onRemove} loginStatus={loginStatus} />

            {loginStatus.user_name === '' && <Login setLoginStatus={setLoginStatus} />}
        </div>
    );
};