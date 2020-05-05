export const AddHistoryItem = (item) => {
    return {
        type: 'HISTORY_ITEM',
        payload: item
    }
}