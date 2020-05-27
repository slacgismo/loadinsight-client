import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Auth from 'util/auth';
import Login from 'containers/login';
import App from 'containers/app';
import Dashboards from 'containers/dashboards';
import Jobs from 'containers/jobs';
import Pipelines from 'containers/pipelines';
import reducers from 'reducers';
import * as serviceWorker from './serviceWorker';
import 'index.css';

// Auth.logoutUser();

const middlewares = [];
middlewares.push(thunk);
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = applyMiddleware(...middlewares)(createStore)(reducers);

const requireLogin = (component) => () => {
  if (Auth.isUserLoggedIn()) {
    return (<App>{component}</App>);
  }

  return <Redirect to="/login" />;
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" render={() => (<Login />)} />
        <Route exact path="/dashboards" render={requireLogin(<Dashboards />)} />
        <Route exact path="/pipelines" render={requireLogin(<Pipelines />)} />
        <Route exact path="/jobs" render={requireLogin(<Jobs />)} />
        <Redirect to="/dashboards" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  window.document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
