import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from "./store/store";

ReactDOM.render(<App store={configureStore()} />, document.getElementById('root'));
registerServiceWorker();
