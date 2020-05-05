import { combineReducers } from 'redux';

import historyReducer from '../Redux/Reducers/HistoryReducer';
import alertReducer from '../Redux/Reducers/AlertReducer';
import toggleFetchingReducer from './Reducers/toggleFetchingReducer';
import toggleDrawerReducer from './Reducers/toggleDrawerReducer';
import ProductsReducer from './Reducers/ProductsReducer';
import AuthReducer from './Reducers/AuthReducer';


export default combineReducers({
    HistoryItems: historyReducer,
    toggleDrawer: toggleDrawerReducer,
    Products: ProductsReducer,
    isLoggedIn: AuthReducer,
    isFetching: toggleFetchingReducer,
    alertConfig: alertReducer
});