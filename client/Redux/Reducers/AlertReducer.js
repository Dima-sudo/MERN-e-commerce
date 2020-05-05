
export default (state = null, action) => {
    
    if(action.type === 'ALERT_CONFIG'){
        return {...action.payload};
    }

    return state;
}