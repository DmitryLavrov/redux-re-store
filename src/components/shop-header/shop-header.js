import React from 'react'
import './shop-header.css'
import {Link} from 'react-router-dom'

const ShopHeader = ({numItems, total}) => {
  return (
    <header className="shop-header row">
      <div className="logo text-dark">
        <Link to="/">
          ReStore
        </Link>
      </div>

      <div className="shopping-cart">
        <Link to="/cart">
          <i className="cart-icon fa fa-shopping-cart"/>
          {numItems} items (${total})
        </Link>
      </div>
    </header>
  )
}

export default ShopHeader