import {Typography, IconButton, Box, Input, List, ListItem, Button, TextField, Stack, Avatar, Container, Paper} from '@mui/material'
import { useState, useCallback, useEffect } from 'react'
import { UploadFile } from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import { ApolloError, gql, useMutation, useReactiveVar } from '@apollo/client'
import { styled } from '@mui/material/styles'
import { Image } from 'cloudinary-react'
import trackTemplate from '../src/pictures/trackTemplate.png'
import { useSelector } from 'react-redux'
import {useRouter} from 'next/router'
import { selectUser } from '../src/features/userSlice'


const UploadTrack = () =>{  

    const Input = styled('input')({
        display: 'none',        
    })

    const router = useRouter()
    const currentUser = useSelector(selectUser)


    const [trackAudio, setTrackAudio] = useState()
    const [trackImage, setTrackImage] = useState()

    const [imageUrl, setImageUrl] = useState()

    const [trackData, setTrackData] = useState({
        name: '',
        description: ''
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
            uploadImage()
        })        
    }, [])  

    const {getRootProps, getInputProps, acceptedFiles } = useDropzone({onDrop, maxFiles: 1})

    useEffect(()=>{
        imageUrl
    },[imageUrl])


    // if(loading) return 'Submitting...'
    // if(error) return `'Submition error!' ${error.message}`

    function uploadImage(){
        const formData = new FormData()
        formData.append('file', trackImage )
        formData.append('upload_preset', 'beatzone')
        fetch('https://api.cloudinary.com/v1_1/dxegpqszm/image/upload', {
            method: 'POST',
            body: formData
        })
        .then(r => r.json()).catch()
        .then(result => setImageUrl(result.url))
    }
    

    function uploadAudio(){
        const formData = new FormData()
        formData.append('file', trackAudio )
        formData.append('upload_preset', 'beatzone')
        fetch('https://api.cloudinary.com/v1_1/dxegpqszm/video/upload', {
            method: 'POST',
            body: formData
        })
        .then(r => r.json())
        .then(result =>  
        addTrack({variables: {name: trackData.name, description: trackData.description, audio: result.url, image: imageUrl, author: currentUser.username}, 
            onCompleted: () => {
                router.push('/')
            }
        }))
    }
    

    const uploadHandler = (e) =>{
        uploadAudio() 
    }

    const imagePath = acceptedFiles.map(file => <Typography marginLeft={4} key={file.path} >{file.path}</Typography>)

    const ADD_TRACK = gql`
        mutation addTrack($name: String, $description: String, $author: String $audio: String, $image: String){
            addTrack(name: $name, description: $description, author: $author audio: $audio, image: $image){
                name
                author
            }
        }
    `
    const [addTrack, {loading, data, error}] = useMutation(ADD_TRACK)

    return(     
        <Container width='sm' sx={{marginTop:8}}>
                <Box marginTop={24}  alignItems='center'>
                    <Box margin={4} display='flex' flexDirection='row'>                                
                        <div {...getRootProps()}>
                            <Stack direction="row" marginTop={4} alignContent='center' alignItems='center'>
                                <input {...getInputProps()}/>
                                <Image src={imageUrl} height={200} width={200}/>                                            
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
                <Button sx={{mx:'auto'}} onClick={uploadHandler} variant="contained" fullWidth color='secondary'>Загрузить</Button>
            </Box>     
        </Container>
    )
}

export default UploadTrack