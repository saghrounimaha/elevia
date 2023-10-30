import { createSlice } from '@reduxjs/toolkit';
import productsItems from '../../data/products';
import { useSelector } from 'react-redux';

const initialState = {
  products:[],
  loading: false,
  product: {},
  item_offset: 0,
  name:        "",
  image:       [],

}

export const productSlice = createSlice({
  
  name: 'products',
  initialState,
  reducers: {
    single_product: (state, { payload }) => {
      state.product = state.products
        .map((item) => item.product)
        .flat()
        .find((product) => product.id === payload);
    },
    specific_product: (state, { payload }) => {
      state.product = state.products.map(item => item.product).flat().find(item => item.id == payload)
    },
    add_item_offset: (state, { payload }) => {
      state.item_offset = payload;
    },
    add_force_page: (state, { payload }) => {
      state.forcePage = payload;
    },
    addname: (state, action) => {
      state.name= action.payload;
  },
    addimage: (state, { payload }) => {
      state.image = payload;
    },
 
  },

})

export const { single_product, specific_product,add_force_page,add_item_offset,addname,addimage } = productSlice.actions;
export const selectProducts = (state) => state.products.products;
export const selectProduct = (state) => state.products.product;

export default productSlice.reducer