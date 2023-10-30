// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist'
// import AsyncStorage from '@react-native-async-storage/async-storage';
//import {propertiesApi} from'./features/propertiesApi'

// import   searchSlice    from './features/search-slice';
// import productSlice   from './features/product-slice';
// import cartSlice  from './features/cart-slice';
// import   wishlistSlice   from './features/wishlist-slice';




// export const store = configureStore({
//   reducer: {
//      // [api.reducerPath]: api.reducer,
//       [propertiesApi.reducerPath]: propertiesApi.reducer,
//       search:searchSlice,
//        products:productSlice,
//        cart:cartSlice,
//        wishlist:wishlistSlice,

//   },
//   middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(propertiesApi.middleware),
// });

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {propertiesApi} from'./features/propertiesApi'


import searchSlice from './features/search-slice';
import productSlice from './features/product-slice';
import cartSlice from './features/cart-slice';
import  wishlistSlice from './features/wishlist-slice';


const persistConfig = {
  key:'root',
  storage:AsyncStorage,
  version:1,
  blacklist:['search','products']
}


const rootReducer = combineReducers({
  [propertiesApi.reducerPath]: propertiesApi.reducer,
  search:searchSlice,
  products:productSlice,
  cart:cartSlice,
  wishlist:wishlistSlice,
})

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:false
  }).concat(propertiesApi.middleware),
})