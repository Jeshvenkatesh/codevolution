const { createStore } = require("redux");
const { produce } = require('immer');

const initialState = {
    name: 'Jesh',
    address: {
        street: 'Strret one',
        city:'city one',
        state:'state one'
    }
}

const STREET_UPDATED = 'STREET_UPDATED';
const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street,
    }
}

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }
            return produce(state, (draft) => {
                draft.address.street =action.payload;
            })
        default:
           return state
    }
}

const store = createStore(reducer);
const unsubscribe = store.subscribe(() => {
    console.log('Updated state', store.getState())
})
store.dispatch(updateStreet('strret two'));
unsubscribe();
