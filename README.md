# redux-re-store

### Install
```shell
Styles from www.bootstrapcdn.com
<link rel="stylesheet" href=https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css/>

Fonts from fontawesome.com/account/cdn
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"/>

Fonts from https://fonts.google.com/specimen/Playfair+Display?query=playfair
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet"/>
```
### Questions

`ErrorBoundary` render `return this.props.children`

### Notes

A frame of react-redux application:

```javascript
// access to Redux Store
<Provider store={store}>
  // Error handling
  <ErrorBoundary>
    // Transfering the service throw contextAPI
    <BookstoreServiceProvider value={service}>
      // Router from react-router
      <BrowserRouter>
        // The application
        <App/>
```
Routing
```javascript
    <Switch>
      <Route path="/"
             component={HomePage}
             exact/>

      <Route path="/cart"
             component={CartPage}
             exact/>
    </Switch>
```
Reading data from Redux store
```javascript
const BookListContainer = ({books}) => {
  return <p>{books}</p>
}

const mapStateToProps = (store) => {
  return {books: store.books}
}

export default connect(mapStateToProps)(BookListContainer)
```
Get values for `props` using HOC:
1. Get access to service using `withBookstoreService` - _bookstoreService_
2. Get access to Redux store using `connect`:
   * get dispatched actions using `mapDispatchToProps` - _booksLoaded_
   * get state using `mapStateToProps` - _books_
```javascript
const data = this.props.bookstoreService.getBooks()

this.props.booksLoaded(data)

render() {
  return <p>{this.props.books}</p>
}

export default pipe(
  connect(mapStateToProps, mapDispatchToProps),
  withBookstoreService()
)(BookListContainer)
```
Naming convention : [Request type]_[Object]_[Action]
```javascript
FETCH_BOOKS_REQUEST
FETCH_BOOKS_SUCCESS
FETCH_BOOKS_FAILURE
```
To add a new record to state Reducer must return a new state with a new record:
```javascript
    case 'BOOK_ADDED_TO_CART':
      /* ... */
      return {
        ...store,
        cartItems: [
          ...store.cartItems,
          newCartItem
        ]
      }
```
To insert updated record:
```javascript
    [
      ...cartItems.slice(0, itemId),
      newCartItem,
      ...cartItems.slice(itemId + 1)
    ]
```
Store Enhancer
```javascript
const logStore = (createStore) => (...args) => {
  const store = createStore(...args)
  const {dispatch} = store
  store.dispatch = (action) => {
    console.log(action.type)
    dispatch(action)
  }
  return store
}
const store = createStore(reducer,logStore)
```
Middleware
```javascript
const logMiddleware = (state) => (next) => (action) => {
  console.log(action.type, state.getState())
  return next(action)
}
const store = createStore(reducer, applyMiddleware(logMiddleware))
```