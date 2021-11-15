import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import rootReducer from './reducers/rootReducer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
const reduxStore = createStore(rootReducer);

ReactDOM.render(
  <Provider store = {reduxStore}>
    <App></App>
  </Provider>
  ,
  document.getElementById('root')
);


