import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/profile/:username'>
          <Profile />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
      </Switch>
    </Router>
  )
}
