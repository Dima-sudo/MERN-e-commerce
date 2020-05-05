
export default (state = false, action) => {

    if(action.type === 'TOGGLE_FETCHING'){
        return !state;
    }

    return state;
}