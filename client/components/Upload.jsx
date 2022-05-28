import {Typography, IconButton, Box, Input, List, ListItem, Button, TextField, Stack, Avatar, Container, Paper} from '@mui/material'
import { useState, useCallback, useEffect } from 'react'
import { UploadFile } from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import { gql, useMutation, useReactiveVar } from '@apollo/client'
import { styled } from '@mui/material/styles'
import { Image } from 'cloudinary-react'
import trackTemplate from '../src/pictures/trackTemplate.png'
import { selectUser } from '../src/features/userSlice'
import { useSelector } from 'react-redux'


const UploadTrack = () =>{  

    const Input = styled('input')({
        display: 'none',        
    })

    const [drag, setDrag] = useState(false)

    const [trackAudio, setTrackAudio] = useState()
    const [trackImage, setTrackImage] = useState()

    const [audioUrl, setAudioUrl] = useState()
    const [imageUrl, setImageUrl] = useState()

    const [trackData, setTrackData] = useState({
        name: '',
        description: '',
        author: ''
    })

    useEffect(()=>{
        console.log(imageUrl)
    }
    ,[])

   
    const dragStart = (e) => {
        e.preventDefault()
        setDrag(true)
    }

    const dragLeave = (e) => {
        e.preventDefault()
        setDrag(false)
    }
    
    const changeHandler = (prop) => (event) =>{
        setTrackData({...trackData, [prop]: event.target.value})
    }
    

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        acceptedFiles.map((file) => {
            const reader = new FileReader()
            reader.onload = () => {
                setTrackImage(reader.result)
                console.log(reader.result)                               
            }
            reader.readAsDataURL(file)
        })        
    }, [])  

    const {getRootProps, getInputProps, acceptedFiles } = useDropzone({onDrop, maxFiles: 1})


    // if(loading) return 'Submitting...'
    // if(error) return `'Submition error!' ${error.message}`

    async function uploadTrack(){
        const formData = new FormData()
        formData.append('file', trackImage )
        formData.append('upload_preset', 'beatzone')
        await fetch('https://api.cloudinary.com/v1_1/dxegpqszm/image/upload', {
            method: 'POST',
            body: formData
        }).then(r => r.json())
        .then(result => {
            setImageUrl(result.url)
            uploadAudio()
        })
    }

    async function uploadAudio(){
        const formData = new FormData()
        formData.append('file', trackAudio )
        formData.append('upload_preset', 'beatzone')
        await fetch('https://api.cloudinary.com/v1_1/dxegpqszm/video/upload', {
            method: 'POST',
            body: formData
        })
        .then(r => r.json())
        .then(result =>  
        addTrack({variables: {name: trackData.name, description: trackData.description, author: trackData.author, audio: result.url, image: imageUrl}, 
            onCompleted: () => {
                setOpen(false)
            }
        }))
    }
    

    const uploadHandler = (e) =>{
        e.preventDefault()
        setTrackData({author: currentUser.username})
        uploadImage() 
    }

    const imagePath = acceptedFiles.map(file => <Typography marginLeft={4} key={file.path} >{file.path}</Typography>)

    const ADD_TRACK = gql`
        mutation addTrack($name: String, $author: String, $description: String, $audio: String, $image: String){
            addTrack(name: $name, author: $author, description: $description, audio: $audio, image: $image){
                name
                author
            }
        }
    `
    const [addTrack, {loading, data, error}] = useMutation(ADD_TRACK)

    return(     
        <Container width='sm' alignItems='center' sx={{marginTop:8}}>
                <Box marginTop={24}  alignItems='center'>
                    <Box margin={4} display='flex' flexDirection='row'>                                
                        <div {...getRootProps()}>
                            <Stack direction="row" marginTop={4} alignContent='center' alignItems='center'>
                                <input {...getInputProps()}/>
                                <Image src={trackData.image} height={200} width={200}/>                                            
                            </Stack>
                            <List>
                                <ListItem>
                                    {imagePath}
                                </ListItem>
                            </List>
                        </div>
                        <Typography sx={{alignSelf:'end', margin: 4}} fontSize={18}>Перетащите картинку или нажмите чтобы выбрать</Typography> 
                    </Box>  
                        <Stack spacing={4} marginLeft={4}>
                            <TextField sx={{width: 3/5, fontSize:30}}  type='text' id='name' label='Название' size='small' onChange={changeHandler('name')}></TextField>
                            <TextField sx={{width: 3/5}}  multiline  maxRows={3} type='text' id='description' label='Описание' size='small' onChange={changeHandler('description')}></TextField>
                        </Stack>
                        <Stack spacing={4} marginTop={4} marginLeft={4} direction="row">
                            <label htmlFor="contained-button-file">
                                <Input accept="audio/*" id="contained-button-file" type="file" onChange={(e)=>setTrackAudio(e.target.files[0])}/>
                                <Button variant="contained" component="span" sx={{width:200}}>Выбрать</Button>
                            </label> 
                            <Typography fontSize={18}>Нажмите чтобы выбрать аудиофайл</Typography>
                        </Stack>
                        <List>
                            <ListItem>
                            </ListItem>
                        </List>                    
                </Box>
                <Box sx={{my:5, mx:'auto'}} maxWidth="30%">
                <Button sx={{mx:'auto'}} variant="contained" fullWidth color='secondary'>Загрузить</Button>
            </Box>     
        </Container>
    )
}

export default UploadTrack