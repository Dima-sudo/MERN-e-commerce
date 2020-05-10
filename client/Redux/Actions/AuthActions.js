import axios from 'axios';
import alertConfig from './AlertActions'
import toggleFetching from './toggleFetching';

import { message } from 'antd';


export const login = (loginForm) => {
    return async (dispatch) => {

        const config = {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              },
              method: 'POST'
            }

        
                const res = await axios.post('http://localhost:8080/auth/login', loginForm, config);

                console.log(res);

                if(res.data.status === 'failure'){
                    message.error(`${res.data.message}`, 4);
                    dispatch(toggleFetching());
                }
                else if(res.data.status === 'success'){
                    const action = {
                        type: 'LOGIN',
                        payload: res.data
                    }
            

                    dispatch(action);
    
                    const alert = {
                        message: "You have successfully logged in",
                        type: "success"
                    }

                    dispatch(alertConfig(alert));
                }

                
    }
}

export const logout = () => {
    return async (dispatch, getState) => {

        const token = getState().isLoggedIn.token;

        const options = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                }
        }

        await axios.get('http://localhost:8080/auth/logout', options);

        const action = {
            type: 'LOGOUT'
        }

        message.success("Successfully logged you out", 4);

        dispatch(action);

    }
}