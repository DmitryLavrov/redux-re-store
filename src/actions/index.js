const booksRequested = () => {
  return {
    type: 'FETCH_BOOKS_REQUEST'
  }
}

const booksLoaded = (newBooks) => {
  return {
    type: 'FETCH_BOOKS_SUCCESS',
    payload: newBooks
  }
}

const booksError = (error) => {
  return {
    type: 'FETCH_BOOKS_FAILURE',
    payload: error
  }
}

const bookAddedToCart = (bookId) => {
  return {
    type: 'BOOK_ADDED_TO_CART',
    payload: bookId
  }
}

const bookDecreasedInCart = (bookId) => {
  return {
    type: 'BOOK_DECREASED_IN_CART',
    payload: bookId
  }
}

const bookDeletedFromCart = (bookId) => {
  return {
    type: 'BOOK_DELETED_FROM_CART',
    payload: bookId
  }
}

const fetchBooks = (dispatch, bookstoreService) => () => {
  dispatch(booksRequested())
  bookstoreService.getBooks()
    .then((data) => dispatch(booksLoaded(data)))
    .catch((error) => dispatch(booksError(error)))
}

export {fetchBooks, bookAddedToCart, bookDecreasedInCart, bookDeletedFromCart}