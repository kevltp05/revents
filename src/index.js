import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const rootEl = document.getElementById('root');

let render = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    , rootEl);
};

if (module.hot) {
    module.hot.accept('./app/layout/App', () => {
        setTimeout(render);
    });
};

render();
