import React, {useState, useEffect, FC} from 'react';
import api from '../api/items';
import PopUp from './PopUp';
import star from '../assets/star.svg'
import done from '../assets/done.svg'
import menu from '../assets/menu.png'
import ModalDelete from './ModalDelete';
import '../../App.css'

interface IFilter {
  completed: boolean,
  uncompleted: boolean,
  favourite: boolean,
}

interface IClasses {
  completed: string,
  uncompleted: string,
  favourites: string,
}

interface IItem {
  id: number,
  title: string,
  completed: boolean,
  favourite: boolean,
}

type IListItems = {
  isRender: number,
  setIsRender: Function
}

const ListItems: FC<IListItems> = ({isRender, setIsRender} ) => {
  const [listOfTasks, setListOfTasks] = useState<any>([]);
  const [popUp, setPopUp] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [numberPopUp, setNumberPopUp] = useState<number>(0);
  const [filter, setFilter] = useState<IFilter>({completed: false,  uncompleted: false, favourite: false})
  const [classes, setClasses] = useState<IClasses>({completed: 'btn', uncompleted: 'btn', favourites: 'btn'});

  const getItems = async () => {
    const response = await api.get("/items");
    return response.data;
  }

  useEffect(() => {
    const getAllItems = async () => {
      const allItems = await getItems();
      setListOfTasks(allItems);
    }
    getAllItems();
  }, [isRender]);

  function removeFromFavourites(item: IItem) {
    api.put(`/items/${item.id}`, { 
      id: item.id, 
      title: item.title, 
      favourite: false,
      completed: item.completed,
      })
  }

  function removeFromCompleted(item: IItem) {
    api.put(`/items/${item.id}`, { 
      id: item.id, 
      title: item.title, 
      favourite: item.favourite,
      completed: false,
      })
    setIsRender(-isRender);
  }

  function openPopUp(id: number) {
    setPopUp(true);
    setNumberPopUp(id);
  }

  function showFavourites() {
    setFilter({...filter, completed: false, uncompleted: false, favourite: true});
    setClasses({...classes, completed: 'btn', uncompleted: 'btn', favourites: 'btn active'});
  }

  function showCompleted() {
    setFilter({...filter, completed: true, uncompleted: false, favourite: false});
    setClasses({...classes, completed: 'btn active', uncompleted: 'btn', favourites: 'btn'});
  }

  function showUnompleted() {
    setFilter({...filter, completed: false, uncompleted: true, favourite: false});
    setClasses({...classes, completed: 'btn', uncompleted: 'btn active', favourites: 'btn'});
  }

  function resetFilter() {
    setFilter({...filter, completed: false, uncompleted: false, favourite: false});
    setClasses({...classes, completed: 'btn', uncompleted: 'btn', favourites: 'btn'});
  }

  return (
    <section>
      <div>
        <button className={classes.completed} onClick={showCompleted}>Completed</button>
        <button className={classes.uncompleted} onClick={showUnompleted}>Uncompleted</button>
        <button className={classes.favourites} onClick={showFavourites}>Favourites</button>
        <button className="btn" onClick={resetFilter}>Reset</button>
      </div>
      {!filter.favourite && !filter.completed && !filter.uncompleted ?
      <div>
      {listOfTasks.map((taskItem: IItem, index: number) => (
        <div className="flex task-container">
          <span className="task-index">{index +=1 }.</span>{taskItem.title}
          <button className="btn btn-menu" onClick={() => {openPopUp(taskItem.id)}}><img src={menu} width="20" height="20"/></button>
          {taskItem.favourite ? 
            <button onClick={() => {removeFromFavourites(taskItem)}} className="btn-favourites"><img src={star} width="20" height="20"/></button>
            : ''
          }
          {taskItem.completed ? 
            <button onClick={() => {removeFromCompleted(taskItem)}} className="btn-favourites"><img src={done} width="20" height="20"/></button>
            : ''
          }
        </div>
        
      ))} </div>: ''}

      {filter.favourite ?
      <div>
      <div>Filter favourite</div>
      {listOfTasks.filter((task: IItem) => task.favourite === true).map((task: IItem, index: number)=> {
        return  (<div><span className="task-index">{index +=1 }.</span> {task.title} 
        <button onClick={() => {removeFromFavourites(task)}} className="btn-favourites"><img src={star} width="20" height="20"/></button>
          {task.completed ? 
            <button onClick={() => {removeFromCompleted(task)}} className="btn-favourites"><img src={done} width="20" height="20"/></button>
            : ''
          }
        </div>)
      }
      )}
      </div> : ''}
    
      {filter.uncompleted ?
      <div>
      <div>In prosses</div>
      {listOfTasks.filter((task: IItem)=> task.completed === false).map((task: IItem, index: number)=> {
        return  (<div><span className="task-index">{index +=1 }.</span> {task.title} 
         {task.favourite ? 
            <button onClick={() => {removeFromFavourites(task)}} className="btn-favourites"><img src={star} width="20" height="20"/></button>
            : ''
          }
        </div>)
      }
      )} 
      </div> : ''}

      {filter.completed ?
      <div>
      <div>Filter completed</div>
      {listOfTasks.filter((task: IItem) => task.completed === true).map((task: IItem, index: number)=> {
        return  (<div><span className="task-index">{index +=1 }.</span> {task.title} 
         {task.favourite ? 
            <button onClick={() => {removeFromFavourites(task)}} className="btn-favourites"><img src={star} width="20" height="20"/></button>
            : ''
          }
          {task.completed ? 
            <button onClick={() => {removeFromCompleted(task)}} className="btn-favourites"><img src={done} width="20" height="20"/></button>
            : ''
          }
        </div>)
      }
      )}
      </div> : '' }
      {popUp ? <PopUp setModalDelete={setModalDelete} numberPopUp={numberPopUp} setPopUp={setPopUp} render={isRender} setRender={setIsRender} /> : ''}
      {modalDelete ? <ModalDelete setModalDelete={setModalDelete} id={numberPopUp} render={isRender} setRender={setIsRender}/> : ""}
    </section>
  )
}

export default ListItems;