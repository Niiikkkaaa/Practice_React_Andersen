import React, {useState, useEffect} from 'react';
import api from '../api/items';
import ItemInfo from '../components/ItemInfo';
import '../../App.css'
import ListItems from './ListItems';

interface ITask {
  title: string,
  favourite: boolean,
  completed: boolean,
}

function TodoList() {
  const [task, setTask] = useState<ITask>({title: '', favourite: false, completed: false});
  const [taskError, setTaskError] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [render, setRender] = useState<number>(1);
  const textLimit: number = 120;

  function validate() { 
    let taskErr = '';

    if(task.title === '') {
      taskErr = 'Field is empty. Enter your task!';
    } else if (task.title.length > textLimit) {
      taskErr = 'Task text limit exceeded !';
    }

    if(taskErr) {
      setTaskError(taskErr)
      return false;
    } else {
      setTaskError('')
      return true;
    }
  }

  function onSubmit(e: any) {
    e.preventDefault();
    setTask({...task, title: task.title.trim()});
    setSubmitted(true);
  }

  useEffect(() => {
    if (submitted) {
      if (validate()) {
        api.post('/items', task);
        setRender(-render);
    }
    setSubmitted(false);
  }
  });

  return (
  <section className="todolist">
    <div className="wrapper">
      <label htmlFor="task" className="input-label">Enter your task:</label>
      <textarea className="textarea" id="task" value={task.title} onChange={e => setTask({...task, title: e.target.value})} />
      <div className="textarea-limit">
        {textLimit - task.title.length >= 0 ?
        <p>For input available {textLimit - task.title.length} characters</p> :
        <p>Task text limit exceeded by {-(textLimit - task.title.length)} characters</p>}
      </div> 
      <div className="error">{taskError}</div>
      <button className="btn btn-submit" onClick={e => onSubmit(e)}>Add</button>
      <ListItems isRender={render} setIsRender={setRender}/>
    </div>
  </section>
  )
}

export default TodoList;


  