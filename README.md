# redux-re-store

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
const BookList = ({books}) => {
  return <p>{books}</p>
}

const mapStateToProps = (store) => {
  return {books: store.books}
}

export default connect(mapStateToProps)(BookList)
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
)(BookList)
```

