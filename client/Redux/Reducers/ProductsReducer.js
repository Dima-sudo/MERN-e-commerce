
export default (state = {}, action) => {
    if(action.type === 'PRODUCT_LIST'){
        return {...state, AllProducts: [...action.payload]};
    }
    if(action.type === 'LAPTOP_LIST'){
        return {...state, Laptops: [...action.payload]};
    }
    if(action.type === 'TELEVISION_LIST'){
        return {...state, Televisions: [...action.payload]};
    }
    if(action.type === 'PHONE_LIST'){
        return {...state, Phones: [...action.payload]};
    }
    if(action.type === 'HEADPHONES_LIST'){
        return {...state, Headphones: [...action.payload]};
    }
    if(action.type === 'OTHER_LIST'){
        return {...state, Others: [...action.payload]};
    }
    if(action.type === 'USER_LISTINGS'){
        return {...state, UserListings: [...action.payload]};
    }
    if(action.type === 'SEARCH_RESULTS'){
        // Null string is received from the json in the format of 'products: 'null'' in case nothing is found
        if(action.payload === 'null'){
            return {...state, SearchResults: null}
        }
        return {...state, SearchResults: [...action.payload]};
    }
    if(action.type === 'USER_PURCHASES'){
        // Null string is received from the json in the format of 'products: 'null'' in case nothing is found
        if(action.payload === 'null'){
            return {...state, SearchResults: null}
        }
        return {...state, UserPurchases: [...action.payload]};
    }

    return state;
}