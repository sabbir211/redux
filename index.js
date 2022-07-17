const {createStore, applyMiddleware}=require("redux")
const {default:logger}=require("redux-logger")


const increment="increment"
const decrement="decrement"
//initial state
const initialState = {
    count: 0
}
//action function
const incrementCounterAction=()=>{
    return{
        type:increment
    }
}
const decrementCounterAction=()=>{
    return{
        type:decrement
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



const store = createStore(counterReducer,applyMiddleware(logger))

store.subscribe(()=>{
    console.log(store.getState())
})
store.dispatch(incrementCounterAction())
store.dispatch(incrementCounterAction())
store.dispatch(incrementCounterAction())
store.dispatch(incrementCounterAction())
store.dispatch(incrementCounterAction())