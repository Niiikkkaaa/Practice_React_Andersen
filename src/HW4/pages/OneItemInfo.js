import React, {useState, useEffect} from 'react';
import '../../App.css'
import api from '../api/products';
import ReactDOM from 'react-dom';
import EditItem from '../components/EditItem';
import { useDispatch, useSelector } from 'react-redux';

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
  let auth = useSelector(store => store.auth.auth);
  const dispatch = useDispatch();

  const getItem = async () => {
    const response = await api.get(`/products/${props.match.params.id}`);
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
    if(!item.rating.count) {
      setIsAvailable(false);
    } else if (item.inStock - numberOfItems < 0){
      alert('Its not in stock!');
    } else {
      api.put(`/products/${item.id}`, { 
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        description: item.description,
        rating: {...item.rating.count -= 1},
      })
      setRender(-render);
      let allItems = [];
      for (let i = 0; i < numberOfItems; i++) {
        allItems.push(item.price);
      }
      dispatch({type: 'ADD_TO_CART', payload: parseInt(numberOfItems)});
      dispatch({type: 'CALCULATE_CART_SUM', payload: item.price*numberOfItems});
      dispatch({type: 'ADD_PRODUCT_TO_CART', payload: props.ItemComponent.title});
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
    } else if(price < 0) {
      priceErr = 'Field cant be negative';
    } else if (price.length > 30) {
      priceErr ='Field cant contain more than 30 letters';
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
      api.put(`/products/${item.id}`, { 
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
    setInStock(item.rating.count);
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
              <img src={item.image} width="300" height="300"/> 
            </div>
            <div className="item-details-info">
            <p className="item-price"><span className="item-details-price">Price:</span> {item.price} $</p>
            <p className="item-price"><span className="item-details-price">In stock:</span> {item.price}</p>
            <h3>Description:</h3>
            <div className="item-description">{item.description}</div>
            <div className="item-price">
              <label for="number"><span className="item-details-price">Enter number of items:</span></label>
              <input type="number" id="number" min="1" onChange={e => setNumberOfItems(e.target.value)}/>
            </div>
            {auth === "admin" ?
            <div>
              <button className="item-add-button item-edit-button" onClick={startEditItem}>Edit item</button>
            </div>:'' }

            {auth ? 
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