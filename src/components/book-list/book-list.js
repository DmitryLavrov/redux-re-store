import React, {Component} from 'react'
import {connect} from 'react-redux'

import BookListItem from '../book-list-item'
import withBookstoreService from '../hoc/with-bookstore-service'
import {booksError, booksLoaded, booksRequested} from '../../actions'
import {pipe} from '../../utils'

import './book-list.css'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'

class BookList extends Component {
  componentDidMount() {
    const {bookstoreService, booksLoaded,
      booksRequested, booksError} = this.props

    booksRequested()
    bookstoreService.getBooks()
      .then((data) => booksLoaded(data))
      .catch((error) => {
        console.log(error)
        booksError(error)
      })
  }

  render() {
    const {books, loading, error} = this.props

    if (loading) {
      return <Spinner/>
    }

    if (error) {
      return <ErrorIndicator error={error}/>
    }

    return (
      <ul className="book-list">
        {books.map(book => (
          <li key={book.id}>
            <BookListItem book={book}/>
          </li>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = ({books, loading, error}) => {
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

const mapDispatchToProps = {booksLoaded, booksRequested, booksError}

export default pipe(
  connect(mapStateToProps, mapDispatchToProps),
  withBookstoreService()
)(BookList)
