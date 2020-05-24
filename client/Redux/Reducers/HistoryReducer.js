export default (state = { visible: false, history: [] }, action) => {
  if (action.type === "HISTORY_ITEM") {
      let isDuplicate = false;
    // Don't add the same item twice. Duplicate check
    if (state.history.length > 0) {
      state.history.forEach((item) => {
        if (item._id === action.payload._id) isDuplicate = true;
      });
    }

    if(!isDuplicate){
        return { ...state, history: [...state.history, action.payload] };
    }
  }
  if (action.type === "TOGGLE_HISTORY_VISIBILITY") {
    return { ...state, visible: !state.visible };
  }

  return state;
};
