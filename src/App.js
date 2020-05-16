import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import login from './pages/login/login';
import Admin from '../src/pages/admin/admin';
import '../src/style/theme.less';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={login}></Route>
          <Route path="/" component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
