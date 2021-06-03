const initialStore = {
  books: []
}

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case 'BOOKS_LOADED':
      return {books: action.payload}

    default:
      return store
  }
}

export default reducer