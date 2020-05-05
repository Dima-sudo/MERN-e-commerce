
import axios from 'axios';
import alertConfig from './AlertActions'

import { message } from 'antd';

export const updateLaptop = (itemId, formData) => {
    return async (dispatch, getState) => {
        const token = getState().isLoggedIn.token;

        const options = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*',
                }
        }

        const res = await axios.put(`http://localhost:8080/products/laptops/${itemId}/update`, formData, options)
        console.log(res)

        if(res.data.status === 'success'){
            message.success('The Laptop listing was updated', 4);
        }
        else if(res.data.status === 'failure'){
            message.warning('Whoops! there was a problem updating that. Working on a fix.', 4);
        }
    }
}

export const deleteLaptop = (itemId) => {
    return async (dispatch, getState) => {
        const token = getState().isLoggedIn.token;

        const options = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*',
                }
        }

        const res = await axios.delete(`http://localhost:8080/products/laptops/${itemId}/delete`, options)
        console.log(res)

        if(res.data.status === 'success'){
            message.success('Your product was deleted', 4);
        }
        if(res.data.status === 'failure'){
            message.warning('Whoops! there was a problem with that item. Working on a fix.', 4);
        }
        
        // Refresh the store
        dispatch(getListings());
    }
}

export const getListings = () => {
    return async (dispatch, getState) => {

        const token = getState().isLoggedIn.token;  

        const options = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
                }
        }

        const res = await axios.get('http://localhost:8080/products/getlistings', options);

        const action = {
            type: 'USER_LISTINGS',
            payload: res.data.products
        }

        dispatch(action);
    }
}

export const getProducts = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8080/products/', {method: "GET"})
        
        const action = {
            type: 'PRODUCT_LIST',
            payload: res.data.products
        }

        dispatch(action);
    }
}

export const getLaptops = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8080/products/laptops', {method: "GET"})
        
        const action = {
            type: 'LAPTOP_LIST',
            payload: res.data.products
        }

        dispatch(action);
    }
}


export const createLaptop = (formData) => {
    return async (dispatch, getState) => {
        
        const token = getState().isLoggedIn.token;

        const options = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data'
                }
        }

        await axios.post('http://localhost:8080/products/laptops/create', formData, options);

        const alert = {
            message: "Your laptop listing was created",
            type: "success"
        }

        dispatch(alertConfig(alert));
    }
}