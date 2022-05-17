const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
const createStore = redux.createStore;
const applymiddleware = redux.applyMiddleware;
const initialState = {
    loading: false,
    users: [],
    error:''
}

const FETCH_USER_REQUESTED = 'FETCH_USER_REQUESTED';
const FETCH_USER_SUCCESSED = 'FETCH_USER_SUCCESSED';
const FETCH_USER_FAILED = 'FETCH_USER_FAILED';

const fetchUserRequest = () => {
    return {
        type : FETCH_USER_REQUESTED
    }
}

const fetchUserSuccessed = (users) => {
    return {
        type : FETCH_USER_SUCCESSED,
        payload: users
    }
}

const fetchUserFailture = (error) => {
    return {
        type : FETCH_USER_FAILED,
        payload:error
    }
}

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case FETCH_USER_REQUESTED :
            return {
                ...state,
                loading: true
            }
        case FETCH_USER_SUCCESSED : 
            return {
                loading: false,
                users: action.payload,
                error:''
            }
        case FETCH_USER_FAILED :
            return {
                loading : false,
                users:[],
                error: action.payload
            }
    }
}

const fetchUser = () => {
    return (dispatch) => {
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((res) => {
          const user = res.data.map((user) => user.id)
          dispatch(fetchUserSuccessed(user))
        })
        .catch((err) => {
            dispatch(fetchUserFailture(err))
        })

    }
}

const store = createStore(reducer,applymiddleware(thunkMiddleware));
store.subscribe(() => console.log(store.getState()))
store.dispatch(fetchUser())
