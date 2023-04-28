import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import Classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1,
    });
  };

  const orderButtonHandler = () => {
    setShowForm(true);
  };

  const orderSubmitHandler = (userData) => {
    setIsSubmitting(true);
    fetch(
      "https://my-first-project-react-h-a50f4-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.removeAll();
  };

  const cartItems = (
    <ul className={Classes[`cart-items`]}>
      {cartCtx.items.map((item) => {
        return (
          <li>
            <CartItem
              key={item.id}
              name={item.name}
              price={item.price}
              amount={item.amount}
              onRemove={cartItemRemoveHandler.bind(null, item.id)}
              onAdd={cartItemAddHandler.bind(null, item)}
            />
          </li>
        );
      })}
    </ul>
  );

  const modalActions = (
    <div className={Classes.actions}>
      <button onClick={props.onClose} className={Classes[`button--alt`]}>
        Close
      </button>
      {hasItems && (
        <button className={Classes.button} onClick={orderButtonHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={Classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {showForm && (
        <Checkout onConfirm={orderSubmitHandler} onClose={props.onClose} />
      )}
      {!showForm && modalActions}
    </React.Fragment>
  );

  const submittedModalContent = (
    <React.Fragment>
      <p>Order submited successfully</p>
      <div className={Classes.actions}>
      <button onClick={props.onClose} className={Classes.button}>
        Close
      </button>
    </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && <p>Submitting your order...</p>}
      {didSubmit && !isSubmitting && submittedModalContent}
    </Modal>
  );
};

export default Cart;
