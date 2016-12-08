export const UPDATE_ORDER = 'UPDATE_ORDER';

export function updateOrder(data){
    return {
        type: UPDATE_ORDER,
        data: data
    };
}