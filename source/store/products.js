import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [

  ],
  status: 'idle'
}

const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (_, thunkAPI) => {
    const { status } = thunkAPI.getState().product
    if (status === 'success') return []

    const response = await await fetch('http://192.168.20.109:3100/all-products', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (response.status !== 200) throw new Error('inespected code')

    return await response.json()
  }
)

const fetchBuy = createAsyncThunk(
  'products/buy',
  async (_, thunkAPI) => {
    const response = await await fetch('http://192.168.20.109:3100/buy', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (response.status !== 200) throw new Error('inespected code')

    return await response.json()
  }
)

export const productSlice = createSlice({
  name: 'products',
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
    buy: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.list = [...state.list, ...action.payload.map(p => ({ ...p, cart: 0 }))]
      state.status = 'success'
    })

    builder.addCase(fetchBuy.fulfilled, (state, action) => {
      state.list = action.payload.map(p => ({ ...p, cart: 0 }))
      state.status = 'success'
    })
  }
})

// Action creators are generated for each case reducer function
const { add } = productSlice.actions
export { add, fetchProducts, fetchBuy }
export default productSlice.reducer
