import React from 'react'
import './shopping-cart-table.css'
import {connect} from 'react-redux'
import {bookAddedToCart, bookDecreasedInCart, bookDeletedFromCart} from '../../actions'

const ShoppingCartTable = ({items, total, onIncrease, onDecrease, onDelete}) => {
  const renderRow = (item, idx) => {
    return (
      <tr key={item.id}>
        <td>{idx + 1}</td>
        <td>{item.title}</td>
        <td>{item.count}</td>
        <td>${item.total}</td>
        <td>
          <button className="btn btn-outline-success"
                  onClick={() => onIncrease(item.id)}>
            <i className="fa fa-plus-circle"/>
          </button>
          <button className="btn btn-outline-warning"
                  onClick={() => onDecrease(item.id)}>
            <i className="fa fa-minus-circle"/>
          </button>
          <button className="btn btn-outline-danger"
                  onClick={() => onDelete(item.id)}>
            <i className="fa fa-trash"/>
          </button>
        </td>
      </tr>
    )
  }

  return (
    <div className="shopping-cart-table">
      <h2>Your order</h2>
      <table className="table">
        <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
          <th>Count</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
        </thead>

        <tbody>
        {items.map(renderRow)}
        </tbody>
      </table>

      <div className="total">
        Total: ${total}
      </div>
    </div>
  )
}

const mapStateToProps = ({cartItems: items, orderTotal: total}) => {
  return {items, total}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrease: (id) => dispatch(bookAddedToCart(id)),
    onDecrease: (id) => dispatch(bookDecreasedInCart(id)),
    onDelete: (id) => dispatch(bookDeletedFromCart(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable)