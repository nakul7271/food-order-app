
import React, {useContext, useState, useEffect} from "react";
import CartIcon from "../Cart/CartIcon";
import Classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";


const HeaderCartButton = (props) => {

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;
    const numberOfCartItem = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const btnClasses = `${Classes.button} ${btnIsHighlighted ? Classes.bump : ''}`;

    useEffect(() => { 
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button onClick={props.onClick} className={btnClasses}>
            <span className={Classes.icon}>
            <CartIcon  />
            </span>
            <span>
             Your Cart
            </span>
            <span className={Classes.badge}>
             {numberOfCartItem}
            </span>
    </button>
    );
};
 

export default HeaderCartButton;