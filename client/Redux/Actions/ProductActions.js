
import React from 'react';

import axios from 'axios';
import alertConfig from './AlertActions'

import { message, notification } from 'antd';
import { InfoOutlined } from '@ant-design/icons'


export const search = (query) => {
    return async (dispatch) => {

        const options = {
            headers: {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin': '*'
            }
        }

        console.log(query);
        const res = await axios.get(`${process.env.SERVER_URL}/products/search/${query}`, options);
        console.log("Finished query request");
        console.log(res);

        if(res.data.status === 'success'){
            const action = {
                type: 'SEARCH_RESULTS',
                payload: res.data.products
            }

            dispatch(action);
        }

        else if(res.data.status === 'failure'){
            const alert = {
                message: "Whoops! There was an error searching for these items",
                type: "error"
            }
    
            dispatch(alertConfig(alert));
        }

    }
}

export const updateProduct = (itemId, formData, category) => {
    return async (dispatch, getState) => {
        const token = getState().isLoggedIn.token;

        const options = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*',
                }
        }

        const res = await axios.put(`${process.env.SERVER_URL}/products/${category}/${itemId}/update`, formData, options)
        console.log(res)

        if(res.data.status === 'success'){
            message.success('The listing was updated', 4);
        }
        else if(res.data.status === 'failure'){
            message.warning('Whoops! there was a problem updating that. Working on a fix.', 4);
        }
    }
}

export const deleteProduct = (itemId, category) => {
    return async (dispatch, getState) => {
        const token = getState().isLoggedIn.token;

        const options = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*',
                }
        }

        const res = await axios.delete(`${process.env.SERVER_URL}/products/${category}/${itemId}/delete`, options)
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

export const getPurchases = () => {
    return async (dispatch, getState) => {

        const token = getState().isLoggedIn.token;  

        const options = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
                }
        }

        const res = await axios.get(`${process.env.SERVER_URL}/products/getpurchases`, options);

        const action = {
            type: 'USER_PURCHASES',
            payload: res.data.products
        }

        dispatch(action);
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

        const res = await axios.get(`${process.env.SERVER_URL}/products/getlistings`, options);

        const action = {
            type: 'USER_LISTINGS',
            payload: res.data.products
        }

        dispatch(action);
    }
}

export const getProducts = () => {
    return async (dispatch) => {
        const res = await axios.get(`${process.env.SERVER_URL}/products/`, {method: "GET"})
        
        const action = {
            type: 'PRODUCT_LIST',
            payload: res.data.products
        }

        dispatch(action);
    }
}

export const getLaptops = () => {
    return async (dispatch) => {
        const res = await axios.get(`${process.env.SERVER_URL}/products/laptops`, {method: "GET"})
        
        const action = {
            type: 'LAPTOP_LIST',
            payload: res.data.products
        }

        dispatch(action);
    }
}


export const createProduct = (formData, category) => {
    return async (dispatch, getState) => {

        // Notification that dissapears after a few seconds
        notification.open({
        message: 'Working on it',
        description:
          'Hold on, we\'re working on it. This process might take a few moments',
        icon: <InfoOutlined style={{ color: '#0070ba' }} />,
        
        });
        
        const token = getState().isLoggedIn.token;

        const options = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data'
                }
        }

        const res = await axios.post(`${process.env.SERVER_URL}/products/${category}/create`, formData, options);
        
        let alert = null;

        if(res.data.status === 'success'){
            alert = {
                message: "Your listing has been created",
                type: "success"
            }
        }
        else if(res.data.status === 'failure'){
            alert = {
                message: "Error creating the listing",
                type: "error"
            }
        }
        

        dispatch(alertConfig(alert));
    }
}

export const getTelevisions = () => {
    return async (dispatch) => {
        const res = await axios.get(`${process.env.SERVER_URL}/products/televisions`, {method: "GET"})
        
        const action = {
            type: 'TELEVISION_LIST',
            payload: res.data.products
        }

        dispatch(action);
    }
}

export const getPhones = () => {
    return async (dispatch) => {
        const res = await axios.get(`${process.env.SERVER_URL}/products/phones`, {method: "GET"})
        
        const action = {
            type: 'PHONE_LIST',
            payload: res.data.products
        }

        dispatch(action);
    }
}

export const getHeadphones = () => {
    return async (dispatch) => {
        const res = await axios.get(`${process.env.SERVER_URL}/products/headphones`, {method: "GET"})
        
        const action = {
            type: 'HEADPHONES_LIST',
            payload: res.data.products
        }

        dispatch(action);
    }
}

export const getOthers = () => {
    return async (dispatch) => {
        const res = await axios.get(`${process.env.SERVER_URL}/products/others`, {method: "GET"})
        
        const action = {
            type: 'OTHER_LIST',
            payload: res.data.products
        }

        dispatch(action);
    }
}