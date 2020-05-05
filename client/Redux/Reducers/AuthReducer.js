

export default (state = null, action) => {
    if(action.type === 'LOGIN'){
        return action.payload
    }
    if(action.type === 'LOGOUT'){
        // Server blacklists token on the backend, redux removes info from the store
        return null;
    }

    return state;

}