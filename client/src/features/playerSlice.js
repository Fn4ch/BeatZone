import { createSlice } from '@reduxjs/toolkit'

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        player: null
    },
    reducers: {
        play: (state, action) => {
            state.player = action.payload
        },
        pause: (state, action) => {
            state.player.isPaused = action.payload.isPaused
        }        
    }
})

export const {play, pause} = playerSlice.actions

export const selectPlayer = (state) => state.player.player

export default playerSlice.reducer