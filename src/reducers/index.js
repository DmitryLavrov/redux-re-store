import bookListReducer from './book-list-reducer'
import shoppingCartReducer from './shopping-cart-reducer'

const reducer = (state, action) => {
  return {
    bookList: bookListReducer(state, action),
    shoppingCart: shoppingCartReducer(state, action)
  }
}

export default reducer
