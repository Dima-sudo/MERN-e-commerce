export default (state = {}, action) => {
    if(action.type === 'MODAL_ACTION'){
        return action.payload;
    }
    return state;
}