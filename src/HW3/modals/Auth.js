import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../../App.css'

function Auth({setActive, auth, setAuth}) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const users = [
    {login: "user", password: "1234", role: "user"},
    {login: "admin", password: "1234", role: "admin"},
  ]

  function loginFunc(login, password) {
    //setAuth(true);
    let isLoginCorrect = false;
    let isPasswordCorrect = false;
    setLoginError('');
    setPasswordError('');
    let count = -1;
    for (let i in users) {
        if (login === users[i].login) {
          isLoginCorrect = true;
          count = i;
        }
    }

    if(!isLoginCorrect) {
      setLoginError('Login is incorrect!');
    } else if (password !== users[count].password) {
      setPasswordError('Password is incorrect!');
    } else if (users[count].role === 'admin'){
      setAuth('admin');
      setActive(false);
    } else {
      setAuth('user');
      setActive(false);
    }
  }
  
    return (
      <section className="auth">
        <label for="login" className="auth-label">Login:</label>
        <input type="text" 
          id="login" 
          class="auth-input"
          value={login}
          onChange={e => setLogin(e.target.value)} 
        />
        <div className="error">
          {loginError}
        </div>

        <label for="password" className="auth-label">Password:</label>
        <input type="text" 
          id="password" 
          class="auth-input"
          value={password}
          onChange={e => setPassword(e.target.value)} 
        />
        <div className="error">
          {passwordError}
        </div>
        
        <div className="flex">
          <button className="auth-button" onClick={() => setActive(false)}>Exit</button>
          <button className="auth-button" onClick={() => loginFunc(login, password)}>Login</button>    
        </div>
      </section>
    )

}

export default Auth; 