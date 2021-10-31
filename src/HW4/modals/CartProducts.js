import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import '../../App.css'
import products from '../api/products';

function Auth({setActive}) {

  let cartProducts = useSelector(store => store.cart.cartProducts);

    return (
      <section className="auth products-cart">
        {cartProducts.map((product, index) => (
          <div>
            <span className="cart-index">{index +=1 }</span>{product}
          </div>
        ))} 
          <button className="auth-button" onClick={() => setActive(false)}>Exit</button>
      </section>
    )
  }

export default Auth; 