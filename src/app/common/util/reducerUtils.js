
// This is an alternate way to make a reducer, the other was is using 
// switch statements
export const createReducer = (initialState, fnMap) => {
    return (state = initialState, { type, payload }) => {
        const handler = fnMap[type]

        return handler ? handler(state, payload) : state
    } 
}