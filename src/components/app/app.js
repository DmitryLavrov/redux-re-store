import {Route, Switch} from 'react-router-dom'

import withBookstoreService from '../hoc'
import {CartPage, HomePage} from '../pages'

const App = () => {

  return (
    <Switch>
      <Route path="/"
             component={HomePage}
             exact/>

      <Route path="/cart"
             component={CartPage}
             exact/>
    </Switch>
  )
}
export default withBookstoreService()(App)