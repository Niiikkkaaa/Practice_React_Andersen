import './App.css';
import HW4 from './HW4/HW4';
import store from './HW4/redux/store'
import {Provider} from 'react-redux'

function App() {
  return (
  <Provider store = {store}>
    <HW4/>
  </Provider>
  );
}

export default App;
