import { createSlice } from '@reduxjs/toolkit';
import { debugLog } from '../lib/helper';

const debugOn = false;

const initialState = {
    currentProduct: "",
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload;
        },
    }
})

export const { setCurrentProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;

export default productSlice;