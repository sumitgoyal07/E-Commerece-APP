import { useState, createContext, useContext, useEffect, } from "react";

const CartContext = createContext();

const CartProvider = (props) => {

    const [cart, setCart] = useState([]);

    useEffect(()=>{
        let exitingitem =localStorage.getItem('cart');
        if(exitingitem){
            setCart(JSON.parse(exitingitem));
        }

    },[])


    return (
        <CartContext.Provider value={[cart, setCart]}>
            {props.children}
        </CartContext.Provider>

    )
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
