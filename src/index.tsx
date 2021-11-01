import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import store from './store'

// @ts-ignore
import Modal from 'react-modal';

import './scss/index.scss';

Modal.setAppElement('#root');

ReactDOM.render(
  <React.StrictMode>
		<Provider store={store}>
    	<App />
		</Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

