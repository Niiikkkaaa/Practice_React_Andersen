import React, {useState, useEffect} from 'react';
import TodoList from './pages/TodoList';

function ReactRouterApp() {

  return (
    <section>
      <div className="wrapper">
        <TodoList/>
      </div>
    </section>
  )

}

export default ReactRouterApp;