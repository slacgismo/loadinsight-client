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
import { composeWithDevTools } from 'redux-devtools-extension';

import Auth from 'util/auth';
import Login from 'containers/login';
import App from 'containers/app';
import Dashboards from 'containers/dashboards';
import Jobs from 'containers/jobs';
import Pipelines from 'containers/pipelines';
import Repositories from 'containers/repositories';
import Import from 'containers/import';
import reducers from 'reducers';
import {
  ROUTE_LOGIN,
  ROUTE_DASHBOARDS,
  ROUTE_PIPELINES,
  ROUTE_JOBS,
  ROUTE_PIPELINES_NEW_REPOSITORIES,
  ROUTE_PIPELINES_NEW_IMPORT,
} from 'config/routes';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.compact.min.css';
import 'index.css';

// Auth.logoutUser();

const middlewares = [];
middlewares.push(thunk);
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = composeWithDevTools(applyMiddleware(...middlewares))(createStore)(reducers);

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
        <Route exact path={ROUTE_LOGIN} render={() => (<Login />)} />
        <Route exact path={ROUTE_DASHBOARDS} render={requireLogin(<Dashboards />)} />
        <Route exact path={ROUTE_PIPELINES} render={requireLogin(<Pipelines />)} />
        <Route exact path={ROUTE_JOBS} render={requireLogin(<Jobs />)} />
        <Route
          exact
          path={ROUTE_PIPELINES_NEW_REPOSITORIES}
          render={requireLogin(<Repositories />)}
        />
        <Route exact path={ROUTE_PIPELINES_NEW_IMPORT} render={requireLogin(<Import />)} />
        <Redirect to={ROUTE_DASHBOARDS} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  window.document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
