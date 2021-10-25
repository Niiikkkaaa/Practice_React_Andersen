import React, {useState, useEffect} from 'react';
import api from '../../api/items';
import ItemInfo from '../components/ItemInfo';
import '../../App.css'


function Home(props) {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    const response = await api.get("/items");
    return response.data;
  }

  useEffect(() => {
    const getAllItems = async () => {
      const allItems = await getItems();
      setItems(allItems);
    }
    getAllItems();
  }, [props.render]);

    return (
    <section className="store-page">
      <div className="wrapper">
        {items.map((item) => (
          <ItemInfo key={item.id} 
            ItemComponent={item} 
            cart={props.cart} 
            setCart={props.setCart} 
            cartSum={props.cartSum}
            setCartSum={props.setCartSum} 
            render={props.render}
            setRender={props.setRender}
            auth={props.auth}
          />
        ))} 
      </div>
    </section>
    )

}

export default Home;


  