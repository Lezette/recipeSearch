import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import localforage from 'localforage';
import { persistReducer } from 'redux-persist';
import reduxReset from 'redux-reset';
import createRootReducer from './rootReducer';
import Reactotron from '../ReactotronConfig';

const persistConfig = {
    blacklist: ['reports'],
    key: 'root',
    storage: localforage,
};

const initialState = {};

const sagaMonitor = Reactotron.createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, createRootReducer);

export const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(
        applyMiddleware(
            sagaMiddleware
        ),
        reduxReset(),
        Reactotron.createEnhancer()
    )
);

/**
 * Configures the redux store with its appropriate middle wares and sets its
 * initial state.
 *
 * @function
 * @params {Object} initialState - the initial state of the redux store
 * @return {Object} properly configured redux store
 */
export default function configureStore() {
    return {
        runSaga: sagaMiddleware.run,
        ...store,
    };
}
