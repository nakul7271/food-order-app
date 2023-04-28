import React, {useContext} from "react";
import MealItemForm from "./MealItemForm";
import Classes from "./MealItem.module.css";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {

    const price = `$${props.price.toFixed(2)}`;
    const cartCtx = useContext(CartContext);

    const addToCartHandler = (amount) => { 
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });
    };
    
  return (
      <li className={Classes.meal}>
          <div>
              <h3>{props.name}</h3>
              <div className={Classes.description}>
              {props.description}
              </div>
              <div className={Classes.price}>
              {price}
              </div>
             
          </div>
          <div>
              <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
          </div>
      
    </li>
  );
};

export default MealItem;
