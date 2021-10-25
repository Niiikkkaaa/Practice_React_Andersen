import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../../App.css'
import Auth from '../modals/Auth';
import CartInfo from './CartInfo';

function Header({cart, cartSum, auth, setAuth}) {
  const [modalActive, setmodalActive] = useState(false);

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
            <button className="auth-button" onClick={() => {setAuth('')}}>Logout</button>:
            <button className="auth-button" onClick={() => {setmodalActive(true)}}>Login</button>
            }
          
          </div>
          {modalActive ? 
          <Auth active={modalActive} setActive={setmodalActive} auth={auth} setAuth={setAuth}/> :
          ''
          }
        </div>
      </section>
    )
}

export default Header; 