import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './rootReducer'

// middleware
const middlewares = [logger]
const composedEnhancers = compose(applyMiddleware(...middlewares))

// root reducer
export const store = createStore(rootReducer, undefined, composedEnhancers)
