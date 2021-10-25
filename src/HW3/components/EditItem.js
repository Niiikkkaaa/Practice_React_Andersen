import React, {useState, useEffect} from 'react';
import '../../App.css'

function EditItem({setTitle, setPrice, setInStock, setDescription, setEditMode, 
  title, price, inStock, description, titleError, priceError, inStockError, descriptionError, onSubmit}) {

  return (          
    <div className="edititem-field">
      <h2>Edit of item</h2>
      <label for="title" className="auth-label">Title:</label>
      <input type="text" name="title" id="title" value={title} onChange={e => setTitle(e.target.value)} class="auth-input" />
      <div className="error">{titleError}</div>
      <label for="price" className="auth-label">Price:</label>
      <input type="number" name="price" id="price" value={price} onChange={e => setPrice(e.target.value)} class="auth-input" />
      <div className="error">{priceError}</div>
      <label for="instock" className="auth-label">In stock:</label>
      <input type="number" name="instock" id="instock" value={inStock} onChange={e => setInStock(e.target.value)} class="auth-input" />
      <div className="error">{inStockError}</div>
      <label for="description" className="auth-label">Description:</label>
      <textarea name="description" id="description" value={description} onChange={e => setDescription(e.target.value)} class="auth-input edititem-description" />
      <div class="textarea-limit">
          {600 - description.length >= 0 ?
          <p>Для ввода доступно {600 - description.length} символов</p> :
          <p>Превышен лимит символов в поле</p>}
        </div> 
      <div className="error">{descriptionError}</div>
      <div className="flex">
        <button className="item-add-button" onClick={()=>setEditMode(false)}>Exit</button>
        <button className="item-add-button" onClick={onSubmit}>Save</button>
      </div>   
    </div>
    )

}

export default EditItem;