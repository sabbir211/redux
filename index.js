const { createStore, applyMiddleware, combineReducers } = require("redux")
const { default: logger } = require("redux-logger")
const axios = require('axios');
const thunk =require("redux-thunk").default



const increment = "increment"
const decrement = "decrement"
//initial state
const initialState = {
    count: 0
}
//action function
const incrementCounterAction = () => {
    return {
        type: increment
    }
}
const decrementCounterAction = () => {
    return {
        type: decrement
    }
}


//Reducer
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case increment:
            return {
                ...state,
                count: state.count + 1
            }
        case decrement:
            return {
                ...state,
                count: state.count - 1
            }

        default:
            return state;
    }

}



/* -----------------------------------------
Data fetching and redux thunk
------------------------------------------------*/

const initialFetch = {
    isLoading: false,
    data: [],
    error: ''
}
// action
const requesting = "requesting"
const failed = "failed"
const success = "success"

const requestingAction = () => {
    return {
        type: requesting
    }
}
const successAction = (data) => {
    return {
        type: success,
        payload: data
    }
}
const failedAction = (message) => {
    return {
        type: failed,
        payload: message
    }
}

// Reducer
const getDataReducer = (state = initialFetch, action) => {
    switch (action.type) {
        case requesting:
            return {
                ...state,
                isLoading: true
            }
        case success:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case failed:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

const getData=()=>{
    return (dispatch)=>{
        dispatch(requestingAction())
        axios.get("https://jsonplaceholder.typicode.com/usrs")
        .then(res=>dispatch(successAction(res.data)))
        .catch(error=>dispatch(failedAction(error.message)))
    }
}


/*-------------------------
Shared functionality is here 

-----------------------------*/
const rootReducer=combineReducers({counterReducer,getDataReducer})
const store = createStore(rootReducer,applyMiddleware(thunk))

store.subscribe(() => {
    console.log(store.getState())
})
store.dispatch(incrementCounterAction())
store.dispatch(incrementCounterAction())
store.dispatch(incrementCounterAction())
store.dispatch(decrementCounterAction())
store.dispatch(decrementCounterAction())

store.dispatch(getData())
