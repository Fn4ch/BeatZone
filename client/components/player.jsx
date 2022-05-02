import { Container, Box, Typography, Slider, IconButton } from '@mui/material'
import { FastRewindRounded, PlayArrowRounded, PauseRounded, FastForwardRounded } from '@mui/icons-material'
import Image from 'next'
import { useState } from 'react'

const Player = () => {

    const[paused, setPaused] = useState()
    const[position, setPosition] = useState()
    const duration = 200

    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
    }

    let author = "obama"
    let track = "if u was a man"
    return(
        <>
        <Box sx={{display:'flex', flexDirection:'column', mx:'10%'}} height="200">
            <Box sx={{display:'flex', alignItems:'center'}}>
                <img src="" alt="trackImage" width="100" height="100"/>
                    <Box
                    sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 1,                    
                    }}
                    >
                        <Box width="auto" sx={{mx:5}}>
                                <Typography>{author}</Typography>
                                <Typography>{track}</Typography>                     
                        </Box>
                        
                        <IconButton aria-label="previous song">
                            <FastRewindRounded fontSize="large" htmlColor='secondary' />
                        </IconButton>
                        <IconButton
                        aria-label={paused ? 'play' : 'pause'}
                        onClick={() => setPaused(!paused)}
                        >
                        {paused ? (
                            <PlayArrowRounded sx={{ fontSize: '3rem' }} htmlColor='light' />
                            ) : 
                        ( 
                            <PauseRounded sx={{ fontSize: '3rem' }} htmlColor='light' /> 
                        )}
                    </IconButton>
                    <IconButton aria-label="next song">
                    <FastForwardRounded fontSize="large" htmlColor='light' />
                    </IconButton>
                    </Box>
                </Box>
            <Slider
                aria-label="time-indicator"
                size="medium"    
                value={position}
                min={0}
                step={1}
                max={duration}
                onChange={(_, value) => setPosition(value)}                        
                sx={{width:'1200'}}
            />
        </Box>   
        </>
    )
}

export default Player