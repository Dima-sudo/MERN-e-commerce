import axios from 'axios';

import { message } from 'antd';

import { getProducts } from './ProductActions';

export const CreateComment = (content, itemId) => {
    return async (dispatch, getState) => {

        const token = getState().isLoggedIn.token;

        const options = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        }

        const res = await axios.post(`${process.env.SERVER_URL}/products/comments/${itemId}/create`, content, options);

        if(res.data.status === 'success'){
            message.success('Your comment was created', 4);
            dispatch(getProducts());
        }
        else if(res.data.status === 'failure'){
            message.warning('Whoops! There was a problem creating the comment, working on it', 4);
        }


    }
}