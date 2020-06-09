
export default (alertConfig) => {
    
    if(alertConfig === null){
        return {
            type: 'CLEAR_ALERT_DATA',
        }
    }

    return {
        type: 'ALERT_CONFIG',
        payload: alertConfig
    }
}