import { createSlice } from '@reduxjs/toolkit'

const initialCounterState = {
    counter: 0,
    showCounter: true
}

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment(state) {
            state.counter++ // can use this code because this code cant malipulate the state
        },
        decrement(state) {
            state.counter--
        },
        increase(state, action) {
            state.counter = state.counter + action.payload // default name 
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter
        }
    }
})
export const counterActions = counterSlice.actions
export default counterSlice