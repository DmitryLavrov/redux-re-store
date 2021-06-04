const initialStore = {
  books: [],
  loading: true,
  error: null
}

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case 'BOOKS_REQUESTED':
      return {
        books: [],
        loading: true,
        error: null
      }

    case 'BOOKS_LOADED':
      return {
        books: action.payload,
        loading: false,
        error: null
      }

    case 'BOOKS_ERROR':
      return {
        books: [],
        loading: false,
        error: action.payload
      }

    default:
      return store
  }
}

export default reducer