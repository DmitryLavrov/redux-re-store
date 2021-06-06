import {compose, createStore} from 'redux'

import reducer from './reducers'

const strStore = (createStore) => (...args) => {
  const store = createStore(...args)
  const {dispatch} = store
  store.dispatch = (action) => {
    if (typeof action === 'string') {
      dispatch({type: action})
    } else {
      dispatch(action)
    }
  }
  return store
}

const logStore = (createStore) => (...args) => {
  const store = createStore(...args)
  const {dispatch} = store
  store.dispatch = (action) => {
    console.log(action.type)
    dispatch(action)
  }
  return store
}

const store = createStore(reducer, compose(strStore, logStore))

store.dispatch({type: 'HELLO'})

export default store