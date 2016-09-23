import injectTapEventPlugin from 'react-tap-event-plugin';
import { render } from 'react-dom';
import React from 'react';
import { HashRouter } from 'react-router';
import App from 'js/components/App';
import AppStore from 'js/store';
import InitialData from 'js/consts/data';
import { Provider } from 'react-redux';

// Needed for onTouchTap, Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Initialize the app
console.log(InitialData);
render(
  <Provider store={AppStore}>
    <HashRouter>
      <App data={InitialData} />
    </HashRouter>
  </Provider>
  , document.getElementById('react-mount')
);
