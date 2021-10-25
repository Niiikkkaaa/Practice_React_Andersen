import React from 'react';
import '../../App.css';

function CartInfo({cart, cartSum}) {
  
    return (
        <div>
           <div>В корзине {cart.length} товаров на сумму {cartSum} $</div>
        </div>
    )

}

export default CartInfo;