import { createSlice } from '@reduxjs/toolkit'

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        trackList: null,
        trackIndex: null,
        setPlaying: {isPlaying: null}
    },
    reducers: {
        trackList: (state, action) => {
            state.trackList = action.payload
        },
        trackIndex: (state, action) => {
            state.trackIndex = action.payload
        },
        setPlaying: (state, action) => {
            state.setPlaying.isPlaying = action.payload.isPlaying
        }
    }
})

export const {trackList, trackIndex, setPlaying} = playerSlice.actions

export const selectTrackList = (state) => state.player.trackList
export const selectTrackIndex = (state) => state.player.trackIndex
export const selectPlaying = (state) => state.player.setPlaying

export default playerSlice.reducer