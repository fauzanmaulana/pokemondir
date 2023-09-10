import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import pokemonReducer from './slice/pokemonSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        pokemon: pokemonReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export type AppDispatch = typeof store.dispatch

export default store