// import {applyMiddleware, createStore, compose} from 'redux'
// import app from './Reducers'
// import createSagaMiddleware from 'redux-saga'
// import rootSaga from './Sagas/rootSaga'

// const sagaMiddleware = createSagaMiddleware()

// export default function configureStore() {
//     const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//     try {
//       console.log("ConfigureStore");
//         const store = createStore(app, composeEnhancers(applyMiddleware(sagaMiddleware)));
//         sagaMiddleware.run(rootSaga);
//         return store;
//       } catch (error) {
//         console.error('Error creating store:', error);
//         throw error;
//       }
// }
import { applyMiddleware, createStore, compose } from 'redux';
import app from './Reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './Sagas/rootSaga';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
    console.log("ConfigureStore");

    const store = createStore(
        app,
        composeWithDevTools(applyMiddleware(sagaMiddleware))
    );

    sagaMiddleware.run(rootSaga);

    return store;
}
