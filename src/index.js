import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

import App from './components/app'
import ErrorBoundary from './components/error-boundary'
import {BookstoreServiceProvider} from './components/bookstore-service-context'
import BookstoreService from './services/bookstore-service'

import store from './store'

const bookstoreService = new BookstoreService()

ReactDOM.render((
    <Provider store={store}>
      <ErrorBoundary>
        <BookstoreServiceProvider value={bookstoreService}>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </BookstoreServiceProvider>
      </ErrorBoundary>
    </Provider>
  ),
  document.getElementById('root'))


