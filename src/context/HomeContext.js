import React, { createContext, useState } from 'react';
import { ProductList } from '../Home';

//Varastoidaan sivustolla tapahtuvat muutokset
export const HomeContext = createContext('');

//Käsitellään uuden tuotteen lisääminen getDefaultCart functiossa
const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i < ProductList.length + 1; i++) {
        cart[i] = 0;
    }
    return cart;
};

export const HomeContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(getDefaultCart());

    //Lisää koriin
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    //Poista korista
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }

    const contextValue = { cartItems, addToCart, removeFromCart };

    console.log(cartItems); //Tähän cartItemsiin täytyis jotenkin saada haettua tietokannasta oikeat tuotetiedot...

    return (
        <HomeContext.Provider value={contextValue}>
            {props.children}
        </HomeContext.Provider>
    );
};