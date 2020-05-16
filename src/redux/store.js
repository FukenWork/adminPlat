/**
 * redux的核心
 */
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk'; // 异步中间件
import { createLogger } from 'redux-logger';

// redux日志
const logger = createLogger({});
const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;