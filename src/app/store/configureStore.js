import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';

export const configureStore = () => {
    // createStore has one required argument and that is to pass
    // it a reducer, it can also have an optional storeEnhancer argument
    const store = createStore(rootReducer, devToolsEnhancer())

    return store
}