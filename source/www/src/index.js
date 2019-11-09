/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import App from './components/App';
// import App from './components/App.navigation';

import './index.css';

// import registerServiceWorker from './registerServiceWorker';

const root = document.getElementById('root');

window.onload = () => {
  ReactDOM.render(
    <BrowserRouter basename={`${location.pathname}#`}>
      <Route
        render={({ history }) => (
          <App history={history} />
        )}
      />
    </BrowserRouter>,
    // $FlowFixMe
    root
  );
};

// registerServiceWorker();

