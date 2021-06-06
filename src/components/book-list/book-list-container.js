import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'

import withBookstoreService from '../hoc/with-bookstore-service'
import {fetchBooks, bookAddedToCart} from '../../actions'

import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'
import BookList from './book-list'

class BookListContainer extends Component {
  componentDidMount() {
    const {fetchBooks} = this.props

    fetchBooks()
  }

  render() {
    const {books, loading, error, onAddedToCart} = this.props

    if (loading) {
      return <Spinner/>
    }

    if (error) {
      return <ErrorIndicator error={error}/>
    }

    return <BookList books={books}
                     onAddedToCart={onAddedToCart}/>
  }
}

const mapStateToProps = ({bookList: {books, loading, error}}) => {
  return {books, loading, error}
}

/*******************************************
 const mapDispatchToProps = (dispatch) => {
  return {
    booksLoaded: (newBooks) => {
      dispatch({
        type: 'BOOKS_LOADED',
        payload: newBooks
      })
    }
  }
}
 *******************************************/

/*******************************************
 const mapDispatchToProps = (dispatch) => {
  return {
    booksLoaded: (newBooks) => {
      dispatch(booksLoaded(newBooks))
    }
  }
}
 *******************************************/

/*******************************************
 const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({booksLoaded}, dispatch)
}
 *******************************************/

/*******************************************
 const mapDispatchToProps = {booksLoaded, booksRequested, booksError}
 *******************************************/

/*******************************************
 const mapDispatchToProps = (dispatch, ownProps) => {
  const {bookstoreService} = ownProps

  return {
    fetchBooks: () => {
      dispatch(booksRequested())
      bookstoreService.getBooks()
        .then((data) => dispatch(booksLoaded(data)))
        .catch((error) => dispatch(booksError(error)))
    }
  }
}
 *******************************************/

const mapDispatchToProps = (dispatch, {bookstoreService}) => {
  return {
    fetchBooks: fetchBooks(dispatch, bookstoreService),
    onAddedToCart: (id) => dispatch(bookAddedToCart(id))
  }
}

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer)
