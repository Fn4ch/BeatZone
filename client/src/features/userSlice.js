import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null 
        },
        playlists: (state, action) =>{
            state.user.playlists = action.payload.playlists
        }        
    }
})

export const {login, logout, playlists} = userSlice.actions

export const selectUser = (state) => state.user.user

export default userSlice.reducer