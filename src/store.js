import {applyMiddleware, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducer from './reducers'

const logMiddleware = (state) => (next) => (action) => {
  console.log(action.type, state.getState())
  return next(action)
}

const strMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
      return next({type: action})
    } else {
      return next(action)
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware, strMiddleware, logMiddleware))

store.dispatch('HELLO')

const delayedActionCreator = (timeout) => (dispatch) => {
  setTimeout(() => dispatch({
    type: 'DELAYED_ACTION'
  }), timeout)
}

store.dispatch(delayedActionCreator(3000))

export default store
