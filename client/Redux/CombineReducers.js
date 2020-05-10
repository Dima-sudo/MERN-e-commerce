import { combineReducers } from 'redux';

import modalReducer from '../Redux/Reducers/ModalReducer';
import historyReducer from '../Redux/Reducers/HistoryReducer';
import alertReducer from '../Redux/Reducers/AlertReducer';
import toggleFetchingReducer from './Reducers/toggleFetchingReducer';
import toggleDrawerReducer from './Reducers/toggleDrawerReducer';
import ProductsReducer from './Reducers/ProductsReducer';
import AuthReducer from './Reducers/AuthReducer';


export default combineReducers({
    Modal: modalReducer,
    HistoryItems: historyReducer,
    toggleDrawer: toggleDrawerReducer,
    Products: ProductsReducer,
    isLoggedIn: AuthReducer,
    isFetching: toggleFetchingReducer,
    alertConfig: alertReducer
});