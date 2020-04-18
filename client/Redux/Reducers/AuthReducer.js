

export default (state = null, action) => {
    if(action.type === 'LOGIN'){
        return action.payload
    }

    return state;

}