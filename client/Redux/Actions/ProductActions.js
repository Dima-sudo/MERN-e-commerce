
import axios from 'axios';


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