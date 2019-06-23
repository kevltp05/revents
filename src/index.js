import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/layout/App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from './app/store/configureStore';

const store = configureStore();

const rootEl = document.getElementById('root');

let render = () => {
    ReactDOM.render(
        // We have to use Provider to connect redux to our app and we pass
        // in store(configureStore) as a prop
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    , rootEl);
};

if (module.hot) {
    module.hot.accept('./app/layout/App', () => {
        setTimeout(render);
    });
};

render();
