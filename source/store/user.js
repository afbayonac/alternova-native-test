import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  active: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    add: (state, { payload }) => {
      const { id, quantity } = payload

      const index = state.list.findIndex(p => p.id === id)

      return {
        ...state,
        list: [
          ...state.list.slice(0, index),
          {
            ...state.list[index],
            cart: state.list[index].cart + quantity,
            stock: state.list[index].stock - quantity
          },
          ...state.list.slice(index + 1, state.list.length)
        ]
      }
    },
    register: (state) => {
      state.active = true
    }
  }
})

// Action creators are generated for each case reducer function
export const { register } = userSlice.actions
export default userSlice.reducer
