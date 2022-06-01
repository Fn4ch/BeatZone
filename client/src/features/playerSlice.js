import { createSlice } from '@reduxjs/toolkit'

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        player: null,
        trackIndex: null
    },
    reducers: {
        trackList: (state, action) => {
            state.player = action.payload
        },
        trackIndex: (state, action) => {
            state.trackIndex = action.payload
        }
    }
})

export const {trackList, setTrackIndex} = playerSlice.actions

export const selectTrackList = (state) => state.player.trackList
export const selectTrackIndex = (state) => state.player.trackIndex

export default playerSlice.reducer