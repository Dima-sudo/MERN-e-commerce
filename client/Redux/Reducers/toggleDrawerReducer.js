

export default (visible = false, action) => {
    if(action.type === 'TOGGLE_DRAWER_VISIBILITY'){
        return !visible;
    }

    return visible;
}