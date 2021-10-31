import React, {useState, useEffect} from 'react';
import Home from './pages/Home';
import About from './pages/About';
import {BrowserRouter, Redirect, Route, Switch,} from "react-router-dom";
import '../App.css'
import Header from './components/Header';
import OneItemInfo from './pages/OneItemInfo';
import NotFoundPage from './pages/NotFoundPage';

function ReactRouterApp() {
  const [cart, setCart] = useState([]);
  const [cartSum, setCartSum] = useState(0);
  const [auth, setAuth] = useState('user');
  const [render, setRender] = useState(0);
  return (
    <section>
    <BrowserRouter>
    <Header />
      <Switch>
        <Route path="/" render={(props) => 
        <Home 
          render={render}
          setRender={setRender} 
          {...props} /> }
          exact 
        />
        <Route path="/about" component={About} exact/>
        <Route path="/:id" render={(props) => 
        <OneItemInfo 
          {...props} /> } 
          exact
        />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
    </section>
  )

}

export default ReactRouterApp;
