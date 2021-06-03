import React, {Component} from 'react'
import {connect} from 'react-redux'

import BookListItem from '../book-list-item'
import withBookstoreService from '../hoc/with-bookstore-service'
import {booksLoaded} from '../../actions'
import {pipe} from '../../utils'

class BookList extends Component {
  componentDidMount() {
    const data = this.props.bookstoreService.getBooks()

    this.props.booksLoaded(data)
  }

  render() {

    return (
      <ul>
        {this.props.books.map(book => (
          <li key={book.id}>
            <BookListItem book={book}/>
          </li>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = (store) => {
  return {books: store.books}
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

const mapDispatchToProps = {booksLoaded}

export default pipe(
  connect(mapStateToProps, mapDispatchToProps),
  withBookstoreService()
)(BookList)
