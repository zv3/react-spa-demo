import injectTapEventPlugin from 'react-tap-event-plugin';
import { render } from 'react-dom';
import React from 'react';
import App from 'js/components/App';
import InitialData from 'js/consts/data';
import appStore from 'js/store';
import { Provider } from 'react-redux';

// Needed for onTouchTap, Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Initialize the app
render(
  <Provider store={appStore}>
    <App data={InitialData} />
  </Provider>
  , document.getElementById('react-mount')
);
