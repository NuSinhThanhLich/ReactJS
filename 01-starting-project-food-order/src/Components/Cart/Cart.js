import React from 'react';
import classes from './Cart.module.css';
import Modal from './../UI/Modal'
import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)
  const cartCtx = useContext(CartContext)
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id)
  }

  const cartItemAddHandler = item => {
    cartCtx.addItem({...item, amount:1})
  }

  const orderHandler = () => {
    setIsCheckOut(true)
  }

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true)
    await fetch('https://food-app-7a466-default-rtdb.asia-southeast1.firebasedatabase.app/Orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    })
    setIsSubmitting(false)
    setDidSubmit(true)
    cartCtx.clearCart()
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => 
         (<CartItem key={item.id} price={item.price} name={item.name} amount={item.amount} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)}></CartItem>)
      )}
    </ul>
  );

  const modalsAction =  
  <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
    {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
  </div>

  const modalContent =
  <React.Fragment>
     {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseCart}></Checkout>}
      {!isCheckOut && modalsAction}
  </React.Fragment>
 
  const isSubmittingModalContent = <p>Sending order data...</p>
  const didSubmitModalContent = 
  <React.Fragment>
    <p>Successfully sent the data</p>
    <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
  </div>

  </React.Fragment>

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!isSubmitting && !didSubmit && modalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;