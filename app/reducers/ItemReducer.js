import {
    UPDATE_ORDER
} from '../actions/App/ItemActions';


const initialState = {
    items: [
        {
            id: 1,
            text: "Test 1",
        },
        {
            id: 2,
            text: "Test 2",
        },
        {
            id: 3,
            text: "Test 3",
        },
        {
            id: 4,
            text: "Test 4",
        },
    ]
};

export function Item(state = initialState, action = null) {
    switch (action.type) {
        case UPDATE_ORDER:
            return _.assign({}, state, {
                items: action.data
            });
        default:
            return state;
    }
}
