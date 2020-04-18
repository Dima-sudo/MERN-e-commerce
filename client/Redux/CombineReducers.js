import { combineReducers } from 'redux';

import toggleDrawerReducer from './Reducers/toggleDrawerReducer';
import ProductsReducer from './Reducers/ProductsReducer';
import AuthReducer from './Reducers/AuthReducer';


export default combineReducers({
    toggleDrawer: toggleDrawerReducer,
    Products: ProductsReducer,
    isLoggedIn: AuthReducer
})