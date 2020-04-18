
export default (state = {}, action) => {
    if(action.type === 'PRODUCT_LIST'){
        return {AllProducts: [...action.payload]};
    }

    return state;
}