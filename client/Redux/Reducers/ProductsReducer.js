
export default (state = {}, action) => {
    if(action.type === 'PRODUCT_LIST'){
        return {...state, AllProducts: [...action.payload]};
    }
    if(action.type === 'LAPTOP_LIST'){
        return {...state, Laptops: [...action.payload]};
    }
    if(action.type === 'USER_LISTINGS'){
        return {...state, UserListings: [...action.payload]}
    }

    return state;
}