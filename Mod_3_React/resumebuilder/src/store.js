import {createStore} from 'redux';
import myReducer from './Reducer/myReducer';

const store = createStore(myReducer);

export default store;