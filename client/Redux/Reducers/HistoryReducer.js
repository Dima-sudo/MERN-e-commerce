export default (state = [], action) => {
    if(action.type === 'HISTORY_ITEM'){
        return [...state, action.payload];
    }

    return state;
}