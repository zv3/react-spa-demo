import {createStore, applyMiddleware, compose} from 'redux';
import {async, logger} from 'js/utils/middleware';
import reducer from 'js/reducers/index';

const middleware = [async];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Remove the logger for production
middleware.push(logger);

export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);
