export default ({title, text, visible, loading}) => {
    return {
        type: 'MODAL_ACTION',
        payload: {
            title, text, visible, loading
        }
    }
}