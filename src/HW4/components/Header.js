import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../App.css'
import Auth from '../modals/Auth';
import CartInfo from './CartInfo';
import CartProducts from '../modals/CartProducts'

function Header({cart, cartSum}) {
  const [modalActive, setmodalActive] = useState(false);
  const [cartModalActive, setCartModalActive] = useState(false);
  let auth = useSelector(store => store.auth.auth);
  const dispatch = useDispatch();

function logout() {
  dispatch({type: 'AUTH', payload: ''})
}
    return (
      <section className="nav-header">
        <div class="wrapper">
          <div className="flex">
            <div>
              <h2>Online store</h2>
            </div>
            <div>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about"className="nav-link">About</Link>
              {
              auth ? 
              <CartInfo cart={cart} cartSum={cartSum}/>:
              ''
              }
              
            </div>
            {
            auth ? 
            <button className="auth-button" onClick={() => {setCartModalActive(true)}}>Cart</button>:
            ''
            }
            {
            auth ? 
            <button className="auth-button" onClick={logout}>Logout</button>:
            <button className="auth-button" onClick={() => {setmodalActive(true)}}>Login</button>
            }

          
          </div>
          {modalActive ? 
          <Auth active={modalActive} setActive={setmodalActive}/> :
          ''
          }
          {cartModalActive ? 
          <CartProducts setActive={setCartModalActive}/> :
          ''
          }
        </div>
      </section>
    )
}

export default Header; 