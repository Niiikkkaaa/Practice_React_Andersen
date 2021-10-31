import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../App.css'
import products from '../api/products';
import api from '../api/products';

function ItemInfo(props) {
  const [isAvailable, setIsAvailable] = useState(true);
  const dispatch = useDispatch()
  let auth = useSelector(store => store.auth.auth)
  
  function addToCart(sum)  {
    if(!props.ItemComponent.rating.count) {
      setIsAvailable(false);
    } else {
      api.put(`/products/${props.ItemComponent.id}`, {
        id: props.ItemComponent.id,
        title: props.ItemComponent.title,
        price: props.ItemComponent.price,
        image: props.ItemComponent.image,
        description: props.ItemComponent.description,
        rating: {...props.ItemComponent.rating.count -= 1},
      })

      props.setRender(-props.render);
      dispatch({type: 'ADD_TO_CART', payload: 1});
      dispatch({type: 'CALCULATE_CART_SUM', payload: sum});
      dispatch({type: 'ADD_PRODUCT_TO_CART', payload: props.ItemComponent.title});
    }
  }
    return (
      <section className="item">
        <div className="item-title-container">
          <Link to={'/' + props.ItemComponent.id} className="item-title"><h3>{props.ItemComponent.title}</h3></Link>
        </div>
        <img src={props.ItemComponent.image} width="130" height="130"/>
        <p className="item-price">{props.ItemComponent.price} $</p>
        <p className="item-price">{props.ItemComponent.rating.count} </p>
        <div>
        {auth ?
        <div>
        { isAvailable ?
          <button className="item-add-button" onClick={() => {addToCart(props.ItemComponent.price)}}>Add to cart</button> :
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