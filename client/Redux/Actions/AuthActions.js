import axios from 'axios'


export const login = (loginForm) => {
    return async (dispatch) => {

        const res = await axios.post('http://localhost:8080/products/', loginForm);

        const action = {
            type: 'LOGIN',
            payload: res.data
        }

        dispatch(action);
    }
}