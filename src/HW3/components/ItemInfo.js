import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../../App.css'
import api from '../../api/items';

function ItemInfo(props) {
  const [isAvailable, setIsAvailable] = useState(true);
  
  function addToCart()  {
    if(!props.ItemComponent.inStock) {
      setIsAvailable(false);
    } else {
      api.put(`/items/${props.ItemComponent.id}`, {
        id: props.ItemComponent.id,
        title: props.ItemComponent.title,
        price: props.ItemComponent.price,
        img: props.ItemComponent.img,
        description: props.ItemComponent.description,
        inStock: props.ItemComponent.inStock - 1
      })

      if(props.render === true) {
        props.setRender(false);
      } else {
        props.setRender(true);
      }
      
      props.setCart([...props.cart, props.ItemComponent.price]);
      props.setCartSum(props.cartSum + props.ItemComponent.price)
      console.log(props.cart);
    }
  }
    return (
      <section className="item">
        <Link to={'/' + props.ItemComponent.id} className="item-title"><h3>{props.ItemComponent.title}</h3></Link>
        <img src={props.ItemComponent.img} width="130" height="130"/>
        <p className="item-price">{props.ItemComponent.price} $</p>
        <div>
        { props.auth ?
        <div>
        { isAvailable ?
          <button className="item-add-button" onClick={addToCart}>Add to cart</button> :
          <div className="item-add-button item-notavailable" >Not Available</div>
        } 
        </div>: 
        <button className="item-add-button item-notavailable">Log in</button>
        }
        </div>
      </section>
    )

}

export default ItemInfo;