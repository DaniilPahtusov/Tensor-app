import reportWebVitals from './reportWebVitals';
import store from './components/redux/redux-store';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import { createBrowserHistory } from 'history';

import './index.css';

const customHistory = createBrowserHistory();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App history={customHistory}/>
        </Provider> 
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
