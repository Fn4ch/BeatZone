import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import PauseRounded from '@mui/icons-material/PauseRounded'
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import FastForwardRounded from '@mui/icons-material/FastForwardRounded'
import FastRewindRounded from '@mui/icons-material/FastRewindRounded'
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded'
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded'

import { selectPlaying, selectTrackIndex, selectTrackList } from '../src/features/playerSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { setPlaying, trackIndex } from '../src/features/playerSlice'

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 'xl',
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor: 'primary',
  backdropFilter: 'blur(40px)',
}))

const CoverImage = styled('div')({
  width: 100,
  height: 100,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
})

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
})

const MusicPlayer = () => {
  const theme = useTheme();
  const [duration, setDuration] = useState(0)
  const [position, setPosition] = useState(0)

  const [isPlaying, setIsPlaying] = useState(false)
  const [tracks, setTracks] = useState([null])  
  const [prevTrackIcon, setPrevTrackIcon] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  const [trackAuthor, setTrackAuthor] = useState()
  const [trackName, setTrackName] = useState()
  const [trackAudio, setTrackAudio] = useState()
  const [trackImage, setTrackImage] = useState()

  const [currentTrackIndex, setCurrentTrackIndex] = useState()
  const [prevTrackIndex, setPrevTrackIndex] = useState()
  const [nextTrackIndex, setNextTrackIndex] = useState()

  const audioRef = useRef(null)
  
  const dispatch = useDispatch()
  const trackList = useSelector(selectTrackList)
  const index = useSelector(selectTrackIndex)
  const playing = useSelector(selectPlaying)

  useEffect(()=>{
    if(trackList != null){
    setTracks(trackList.tracks)
    setIsVisible(true)
    }    
    else{
      setIsVisible(false)
    }
  },[trackList])

  useEffect(()=>{
    setIsPlaying(playing.isPlaying)
    console.log(playing)
  }, [playing])

  useEffect(()=>{
    if(index != null){
      setCurrentTrackIndex(index)
    }
    if(currentTrackIndex != null){
      setTrackName(tracks[index.currentSongIndex].name)
      setTrackAuthor(tracks[index.currentSongIndex].author)
      setTrackImage(tracks[index.currentSongIndex].image)
      setTrackAudio(tracks[index.currentSongIndex].audio)
      setDuration(Math.round(audioRef.current.duration))
      if(index.currentSongIndex + 1 == tracks.length){
        setNextTrackIndex(0)
      }
      else{
        setNextTrackIndex(index.currentSongIndex +1)
      }
      if(index.currentSongIndex == 0){
        setPrevTrackIcon(false)
      }      
      else{
        setPrevTrackIcon(true)
        setPrevTrackIndex(index.currentSongIndex -1)
      }
      dispatch(setPlaying({
        isPlaying: false
      }))
    }
  },[index])

  const pauseHandler = () =>{      
    isPlaying ? audioRef.current.pause() : audioRef.current.play()
    isPlaying ? dispatch(setPlaying({
      isPlaying: false
    })) :
    dispatch(setPlaying({
      isPlaying: true
    })) 
  }

  const volumeChangeHandler = (e) =>{
    audioRef.current.volume = (e.target.value / 100)
  }

  const nextTrackHandler = (e) =>{
    dispatch(trackIndex({
      currentSongIndex: nextTrackIndex
    }))
  }

  const prevTrackHandler = (e) =>{
    dispatch(trackIndex({
      currentSongIndex: prevTrackIndex
    }))
  }
  

  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'

  const formatDuration = (value) => {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`
  }

  return (
     isVisible ?
      (<Box sx={{position: 'fixed', bottom: 0, width: '100%', height: 240, mb: -2}}>
      <Widget>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CoverImage>
            <img
              alt=""
              src={trackImage}
            />
          </CoverImage>
          <Box sx={{ ml: 1.5, minWidth: 0 }} flexGrow={1}>
            <Typography name='TrackName' fontSize={24} variant="caption" color="text.secondary" fontWeight={500}>
            {trackName}
            </Typography>
            <Typography noWrap name='authorName'>
              <b>{trackAuthor}</b> 
            </Typography>
            <Typography noWrap letterSpacing={-0.25}>              
            </Typography>            
          </Box>          
          <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1, visibility: {xs: 'hidden',sm: 'hidden', md:'hidden', lg:'visible', xl:'visible'}}} alignItems="center" >
                <VolumeDownRounded htmlColor={lightIconColor} />
                <Slider
                    aria-label="Volume"
                    onChange={volumeChangeHandler}
                    defaultValue={30}                    
                    sx={{
                    width: 200,
                    color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                    '& .MuiSlider-track': {
                        border: 'none',
                    },
                    '& .MuiSlider-thumb': {
                        width: 24,
                        height: 24,
                        backgroundColor: '#fff',
                        '&:before': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                        },
                        '&:hover, &.Mui-focusVisible, &.Mui-active': {
                        boxShadow: 'none',
                        },
                    },
                    }}
                />
                <VolumeUpRounded htmlColor={lightIconColor} />
            </Stack>
        </Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => setPosition(value)}
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&:before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === 'dark'
                    ? 'rgb(255 255 255 / 16%)'
                    : 'rgb(0 0 0 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{display: 'flex',alignItems: 'center',justifyContent: 'space-between',mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>
        <Box
          sx={{display: 'flex',alignItems: 'center',justifyContent: 'center',mt: -1}}
        >
          <IconButton onClick={prevTrackHandler} aria-label="previous song">
            {prevTrackIcon ? <FastRewindRounded fontSize="large" htmlColor={mainIconColor} /> : <Box/>} 
          </IconButton>
          <IconButton
            aria-label={!isPlaying ? 'play' : 'pause'}
            onClick={() => {
              pauseHandler()
            }}
          >
            {isPlaying ? (
              <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />              
            ) : (
              <PlayArrowRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor}/>
            )}
          </IconButton>
          <IconButton onClick={nextTrackHandler} aria-label="next song">
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>            
        </Box> 
        <Box visibility='hidden'>
        <audio ref={audioRef} src={trackAudio}></audio>  
        </Box>       
      </Widget>
    </Box>) : <Box/> 
  ) 
}

export default MusicPlayer