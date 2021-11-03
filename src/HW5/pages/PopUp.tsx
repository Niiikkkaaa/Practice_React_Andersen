import React, {useState, useEffect, useRef, createRef, FC} from 'react';
import api from '../api/items';
import ItemInfo from '../components/ItemInfo';
import '../../App.css'
import ModalDelete from './ModalDelete';


type IPopUp = {
  numberPopUp: number,
  setPopUp: any,
  render: number,
  setRender: Function, 
  setModalDelete: any
}

const PopUp: FC<IPopUp> = ({numberPopUp, setPopUp, render, setRender, setModalDelete})  =>{
  const [item, setItem] = useState<any>({});

  const myRef = useRef<any>();

  const handleClickOutside = (e: Event) => {
    if (!myRef.current.contains(e.target)) {
      setPopUp(false)
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });
  
  const getItem = async () => {
    const response = await api.get(`/items/${numberPopUp}`);
    return response.data;
  }

  useEffect(() => {
    const getOneItem = async () => {
      const item = await getItem();
      setItem(item);
    }
    getOneItem();
  }, [render]);

  function setCompleted() {
    if(item.completed) {
      api.put(`/items/${numberPopUp}`, { 
        id: item.id, 
        title: item.title, 
        favourite: item.favourite,
        completed: false,
        })
    } else {
      api.put(`/items/${numberPopUp}`, { 
        id: item.id, 
        title: item.title, 
        favourite: item.favourite,
        completed: true,
      })
    }
    setRender(-render);
    setPopUp(false);
  }

  function setFavourite() {
    if(item.favourite) {
      api.put(`/items/${numberPopUp}`, { 
        id: item.id, 
        title: item.title, 
        favourite: false,
        completed: item.completed,
        })
    } else {
      api.put(`/items/${numberPopUp}`, { 
        id: item.id, 
        title: item.title, 
        favourite: true,
        completed: item.completed,
        })
    }
    setRender(-render);
    setPopUp(false);
    console.log(item);
  }

  function deleteItem() {
    setModalDelete(true)
    setPopUp(false)
  }
  
  return (
  <div className="popup" ref={myRef}>
    <div className="popup-task-title">
      Task: {item.title}
    </div>
    {item.favourite ?
      <button className="btn popup-btn btn-exit" onClick={setFavourite}>Remove from Favourites</button> :
      <button className="btn popup-btn" onClick={setFavourite}>Add to Favourites</button>
    }
    {item.completed ?
      <button className="btn popup-btn btn-exit" onClick={setCompleted}>Set Uncompleted</button> :
      <button className="btn popup-btn" onClick={setCompleted}>Set completed</button>
    }
    <button className="btn popup-btn btn-exit" onClick={deleteItem}>Delete</button>
    <button className="btn popup-btn btn-exit" onClick={() => {setPopUp(false)}}>Exit</button>
  </div>
  )
}

export default PopUp;




