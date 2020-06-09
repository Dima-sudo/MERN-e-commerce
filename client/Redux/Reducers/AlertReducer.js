
export default (state = null, action) => {
    
    if(action.type === 'ALERT_CONFIG'){
        return {...action.payload};
    }
    if(action.type === 'CLEAR_ALERT_DATA'){
        return null;
    }

    return state;
}