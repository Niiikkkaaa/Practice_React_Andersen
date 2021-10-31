import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import '../../App.css';

function CartInfo() {
    
  const cart = useSelector(store => store.cart.cart);
  const cartSum = useSelector(store => store.cart.cartSum);
  
  return (
    <div>
      <div>В корзине {cart} товаров на сумму {+cartSum.toFixed(2)} $</div>
    </div>
  )

}

export default CartInfo;