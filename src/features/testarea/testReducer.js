import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstants";
import { createReducer } from "../../app/common/util/reducerUtils";


const initialState = {
    data: 42
}

// Using these functions and then passing them into createReducer is 
// an alternate way to make a reducer
const incrementCounter = (state) => {
    return {...state, data: state.data + 1}
}

const decrementCounter = (state) => {
    return {...state, data: state.data - 1}
}

export default createReducer(initialState, {
    [INCREMENT_COUNTER]: incrementCounter,
    [DECREMENT_COUNTER]: decrementCounter
});

// const testReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case INCREMENT_COUNTER:
//             // We are spreading the state out and then changing to data
//             // property on it and returning a new object with the changed state 
//             return {...state, data: state.data + 1}
//         case DECREMENT_COUNTER:
//             return {...state, data: state.data - 1}
//         default:
//             return state
//     }
// }
//
// export default testReducer