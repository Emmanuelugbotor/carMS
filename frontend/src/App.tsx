import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './screens/admin/login'
import AdminDashboard from './screens/admin/dashboard'
import ManagersDashboard from './screens/managers/dashboard'

import { Provider } from 'react-redux'
import store from './redux/store'
import Home from './screens/Home';

function App() {
  return (

    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/adminlogin" component={LoginPage} />
          <Route exact path="/admindashboard" component={AdminDashboard} />
          <Route exact path="/manager/:id" component={ManagersDashboard} />
          {/* <Route exact path="/editor" component={Editor} /> */}
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;

