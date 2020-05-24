export const AddHistoryItem = (item) => {
    return {
        type: 'HISTORY_ITEM',
        payload: item
    }
}

export const toggleHistory = () => {
    return {
        type: 'TOGGLE_HISTORY_VISIBILITY'
    }
}