const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: '510'
}

const updateCartItems = (cartItems, newCartItem, itemId) => {
  if (newCartItem.count === 0) {
    return [
      ...cartItems.slice(0, itemId),
      ...cartItems.slice(itemId + 1)
    ]
  }

  if (itemId === -1) {
    return [...cartItems, newCartItem]
  } else {
    return [
      ...cartItems.slice(0, itemId),
      newCartItem,
      ...cartItems.slice(itemId + 1)
    ]
  }
}

const updateCartItem = (cartItem = {}, book, quantity) => {
  const {
    id = book.id,
    title = book.title,
    count = 0,
    total = 0
  } = cartItem

  return {
    id,
    title,
    count: count + quantity,
    total: total + quantity * book.price
  }
}

const updateOrder = (payload, state, quantity) => {
  const {books, cartItems} = state
  const bookId = payload
  const book = books.find(({id}) => id === bookId)
  const itemId = cartItems.findIndex(({id}) => id === bookId)
  const cartItem = cartItems[itemId]

  const newCartItem = updateCartItem(cartItem, book, quantity)

  return {
    ...state,
    cartItems: updateCartItems(cartItems, newCartItem, itemId)
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return {
        ...state,
        books: [],
        loading: true,
        error: null
      }

    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null
      }

    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload
      }

    case 'BOOK_ADDED_TO_CART':
      return updateOrder(action.payload, state, 1)

    case 'BOOK_DECREASED_IN_CART':
      return updateOrder(action.payload, state, -1)

    case 'BOOK_DELETED_FROM_CART':
      const cartItem = state.cartItems.find(({id}) => id === action.payload)
      return updateOrder(action.payload, state, -cartItem.count)

    default:
      return state
  }
}

export default reducer
