import React, {useState, useEffect} from 'react';
import '../../App.css'
import api from '../../api/items';
import EditItem from '../components/EditItem';

function OneItemInfo(props) {
  const [item, setItem] = useState([]);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [render, setRender] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(0);
  const [description, setDescription] = useState(0);
  const [titleError, setTitleError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [inStockError, setInStockError] = useState('')
  const [descriptionError, setDescriptionError] = useState('');
  const [submitted, setSubmitted] = useState(false);


  const getItem = async () => {
    const response = await api.get(`/items/${props.match.params.id}`);
    return response.data;
  }

  useEffect(() => {
    const getOneItem = async () => {
      const item = await getItem();
      setItem(item);
    }
    getOneItem();
  }, [render]);

  function addToCart()  {
    if(!item.inStock) {
      setIsAvailable(false);
    } else if (item.inStock - numberOfItems < 0){
      alert('Its not in stock!');
    } else {
      api.put(`/items/${item.id}`, { 
        id: item.id,
        title: item.title,
        price: item.price,
        img: item.img,
        description: item.description,
        inStock: item.inStock - numberOfItems
      })
      setRender(-render);
      let allItems = [];
      for (let i = 0; i < numberOfItems; i++) {
        allItems.push(item.price);
      }
      props.setCart([...props.cart, ...allItems]);
      props.setCartSum(props.cartSum + item.price*numberOfItems);
    }
  }

  function validate() {
    let titleErr = '';
    let priceErr = '';
    let inStockErr = '';
    let descriptionErr = '';

    if (title === '') {
      titleErr = 'Field is empty';
    } else if(title.length > 30) {
      titleErr ='Field cant contain more than 30 letters';
    }

    if (price === '') {
      priceErr = 'Field is empty';
    } else if (price < 0) {
      priceErr = 'Field cant be negative';
    }
    
    if (inStock === '') {
      inStockErr = 'Field is empty';
    } else if (inStock < 0) {
      inStockErr = 'Field cant be negative';
    } else if (inStock.length > 30) {
      inStock ='Field cant contain more than 30 letters';
    }

    if(description === '') {
      descriptionErr = 'Field is empty';
    } else if (600 - description.length < 0) {
      descriptionErr = 'Field cant contain more than 600 letters';
    }
    
    if(titleErr || priceErr || inStockErr || descriptionErr) {
      setTitleError(titleErr);
      setPriceError(priceErr);
      setInStockError(inStockErr);
      setDescriptionError(descriptionErr);
      return false;
    } else {
      setTitleError('');
      setPriceError('');
      setInStockError('');
      setDescriptionError('');
      api.put(`/items/${item.id}`, { 
        id: item.id,
        title: title,
        price: price,
        img: item.img,
        description: description,
        inStock: inStock})
      setRender(-render);
      return true;
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    setTitle(title.trim());
    setDescription(description.trim());
    setSubmitted(true);
  }

  useEffect(() => {
    if (submitted) {
      if ( validate()) {
        setEditMode(false);
    }
  }
    setSubmitted(false);
  }, [submitted]);


  function startEditItem() {
    setTitle(item.title);
    setPrice(item.price);
    setInStock(item.inStock);
    setDescription(item.description);
    setEditMode(true);
  }

    return (
      <section className="item-details" id="root">
        <div className="wrapper">
          {editMode ?
          <EditItem 
            title={title}
            price={price}
            inStock={inStock}
            description={description}
            setTitle={setTitle} 
            setPrice={setPrice}
            setInStock={setInStock}
            setDescription={setDescription}
            setEditMode={setEditMode}
            onSubmit={onSubmit}
            titleError={titleError}
            priceError={priceError}
            inStockError={inStockError}
            descriptionError={descriptionError}
            />
          :
          <div>
            <h2 className="item-details-title">{item.title}</h2>
            <div className="item-details-container">
            <div className="item-details-photo">
              <img src={item.img} width="300" height="300"/> 
            </div>
            <div className="item-details-info">
            <p className="item-price"><span className="item-details-price">Price:</span> {item.price} $</p>
            <p className="item-price"><span className="item-details-price">In stock:</span> {item.inStock}</p>
            <h3>Description:</h3>
            <div className="item-description">{item.description}</div>
            <div className="item-price">
              <label for="number"><span className="item-details-price">Enter number of items:</span></label>
              <input type="number" id="number" min="1" onChange={e => setNumberOfItems(e.target.value)}/>
            </div>
            {props.auth === "admin" ?
            <div>
              <button className="item-add-button item-edit-button" onClick={startEditItem}>Edit item</button>
            </div>:'' }

            {props.auth ? 
            <div>
              {isAvailable ? 
              <button className="item-add-button" onClick={addToCart}>Add to cart</button>:
              <div className="item-add-button item-notavailable" >Not Available</div>}
            </div>:
            <button className="item-add-button item-notavailable">Log in</button>
            } 
            </div>
          </div>
          </div>}
        </div>
      </section>
    )
}

export default OneItemInfo;