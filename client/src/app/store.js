import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import playerReducer from '../features/playerSlice'

export default configureStore({
    reducer: {
        user: userReducer, 
        player: playerReducer
    }
})