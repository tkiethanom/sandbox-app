import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import invariant from 'redux-immutable-state-invariant';

export function store(reducer) {
  const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true
  });

  let result;

  if(process.env.NODE_ENV == 'production'){
    result = compose(
      applyMiddleware(
        thunkMiddleware
      )
    );
  }
  else{
    result = composeWithDevTools(
      applyMiddleware(
        invariant(),
        thunkMiddleware,
        loggerMiddleware
      )
    );
  }

  return createStore(reducer, result);
}

