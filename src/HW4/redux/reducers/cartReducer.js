const initialState = {
  cart: 0,
  cartSum: 0,
  cartProducts: []
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': 
      return { ...state, cart: state.cart + action.payload};
    case 'CALCULATE_CART_SUM':
      return {...state, cartSum: state.cartSum + action.payload}
    case 'ADD_PRODUCT_TO_CART': 
      return { ...state, cartProducts: [...state.cartProducts, action.payload]};
    default:
      return state;
  }
}

