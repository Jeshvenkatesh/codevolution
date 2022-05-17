const redux = require('redux');
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICE_OEDERED = 'ICE_OEDERED';
const ICE_RESTOCKED = 'ICE_RESTOCKED';

const orderCakes = () => {   // Action
	return {
		type:CAKE_ORDERED,
		payload:1
	}
}

const restoreCakes = (qty = 1) => {
	return {
		type:CAKE_RESTOCKED,
		payload:qty
	}
}
const orderIce = () => {
	return {
		type:ICE_OEDERED,
		payload: 1
	}
}
const restoreIce = (qty = 1) => {
	return {
		type:ICE_RESTOCKED,
		payload:qty
	}
}

const cakesState = {
	numOfCakes: 10,
}
const iceState = {
	numberOfIce: 50,
}
const iceReducer = ( state = iceState, action ) => {
	switch (action.type) {
		case ICE_OEDERED:
			return {
				...state,   // coping the state
				numberOfIce: state.numberOfIce - 1
			}
		case ICE_RESTOCKED:
			return {
				...state,
				numberOfIce:state.numberOfIce + action.payload
			}
		default:
			return state
	}
}
const cakesReducer = ( state = cakesState, action) => {  // reducer
	switch (action.type) {
		case CAKE_ORDERED:
			return {
				...state,   // coping the state
				numOfCakes: state.numOfCakes - 1
			}
		case CAKE_RESTOCKED:
			return {
				...state,
				numOfCakes:state.numOfCakes + action.payload
			}
		default:
			return state
	}
}

const rootReducer = combineReducers({
	cakes: cakesReducer,
	ice: iceReducer
})

const store = redux.createStore(rootReducer, applyMiddleware(logger))
console.log('InitialState =>', store.getState());
const unsubscribe = store.subscribe(() => {})
const actions = bindActionCreators({orderCakes,restoreCakes, orderIce,restoreIce}, store.dispatch )
actions.orderCakes()
actions.restoreCakes(3)
actions.orderIce()
actions.restoreIce(3)

// store.dispatch(orderCakes());
// store.dispatch(orderCakes());
// store.dispatch(orderCakes());
// store.dispatch(restoreCakes(3));
unsubscribe();
