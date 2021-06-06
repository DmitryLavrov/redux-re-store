import {applyMiddleware, createStore} from 'redux'

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

const store = createStore(reducer, applyMiddleware(strMiddleware, logMiddleware))

store.dispatch('HELLO')

export default store