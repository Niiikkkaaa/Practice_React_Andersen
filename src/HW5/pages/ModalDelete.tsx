import React, {useState, useEffect, FC} from 'react';
import api from '../api/items';
import ItemInfo from '../components/ItemInfo';
import '../../App.css'

interface IModalDelete {
  setModalDelete: Function,
  id: number,
  render: number,
  setRender: Function

}
const ModalDelete: FC<IModalDelete> = ({setModalDelete,  id, render, setRender}) => {

  function deleteItem() {
    api.delete(`/items/${id}`);
    setRender(-render);
    setModalDelete(false);
  }
  

  return (
    <section className="popup">
      <div>Вы действительно хотите удалить задачу?</div>
      <button className="btn popup-btn btn-exit" onClick={() => {setModalDelete(false)}}>No</button>
      <button className="btn popup-btn btn-exit" onClick={deleteItem}>Yes</button>
    </section>
  )
}

export default ModalDelete;