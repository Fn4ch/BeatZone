import { Dialog, DialogContent, DialogTitle, Typography, IconButton, Box, Input, List, ListItem, Button, TextField, Stack, Avatar} from '@mui/material'
import { useState, useCallback, useEffect } from 'react'
import { UploadFile } from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import { gql, useMutation, useReactiveVar } from '@apollo/client'
import { styled } from '@mui/material/styles'
import { Image } from 'cloudinary-react'
import trackTemplate from '../src/pictures/trackTemplate.png'


const Upload = () =>{

    const Input = styled('input')({
        display: 'none',
    })

    const [drag, setDrag] = useState(false)
    const [open, setOpen] = useState(false)

    const [trackAudio, setTrackAudio] = useState()
    const [trackImage, setTrackImage] = useState()

    const [trackData, setTrackData] = useState({
        image: '',
        name: '',
        author: '',
        description: '',
        audio: ''
    })

    useEffect(()=>{
        trackData.image
    })
    const handleClickClose = () =>{
        setOpen(false)
    }

    const handleClickOpen = () =>{
        setOpen(true)
    }

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

    async function uploadImage(){
        const formData = new FormData()
        formData.append('file', trackImage )
        formData.append('upload_preset', 'beatzone')
        const url = await fetch('https://api.cloudinary.com/v1_1/dxegpqszm/image/upload', {
            method: 'POST',
            body: formData
        }).then(r => r.json())
        console.log(url)
        setTrackData({image: url.url})
    }

    async function uploadAudio(){
        const formData = new FormData()
        formData.append('file', trackAudio )
        formData.append('upload_preset', 'beatzone')
        const url = await fetch('https://api.cloudinary.com/v1_1/dxegpqszm/video/upload', {
            method: 'POST',
            body: formData
        }).then(r => r.json())
        console.log(url)
        setTrackData({audio: url.url})
    }

    const uploadHandler = async (e) =>{
        e.preventDefault()
        uploadAudio()
        uploadImage()
    }

    const imagePath = acceptedFiles.map(file => <Typography marginLeft={4} key={file.path} >{file.path}</Typography>)
    return(
        <>            
            <IconButton onClick={handleClickOpen}><UploadFile fontSize='large' color='secondary' /></IconButton>
            <Dialog
                fullWidth={true}
                maxWidth='lg'
                open={open}
                onClose={handleClickClose}
            >                
                <DialogTitle sx={{mx:'auto'}}>Upload Track</DialogTitle>
                <DialogContent sx={{width:'lg', height:'600px', display:'flex', flexDirection:'column'}}>                                    
                        <div {...getRootProps()}>
                            <Stack spacing={4} direction="row" marginTop={4} alignContent='center' alignItems='center'>
                                <input {...getInputProps()}/>
                                <Image src={trackData.image} height={150} width={150}/>
                                <Stack direction="column" justifyItems='center' alignItems='center'>
                                    <Typography fontSize={18} >Перетащите картинку или нажмите чтобы выбрать</Typography>
                                </Stack>                        
                            </Stack>
                            <List>
                                <ListItem>
                                    {imagePath}
                                </ListItem>
                            </List>
                        </div>
                        <Stack spacing={4} marginLeft={4}>
                            <TextField sx={{width: 2/5, fontSize:30}}  type='text' id='name' label='Название' size='small' onChange={changeHandler('name')}></TextField>
                            <TextField sx={{width: 2/5}}  multiline  maxRows={3} type='text' id='description' label='Описание' size='small' onChange={changeHandler('description')}></TextField>
                        </Stack>
                        <Stack spacing={4} marginTop={4} marginLeft={4} direction="row">                            
                            <Typography fontSize={18}>Нажмите чтобы выбрать аудиофайл</Typography>
                            <label htmlFor="contained-button-file">
                                <Input accept="audio/*" id="contained-button-file" type="file" onChange={(e)=>setTrackAudio(e.target.files[0])}/>
                                <Button variant="contained" component="span" sx={{width:200}}>Выбрать</Button>                                
                            </label> 
                        </Stack>
                        <List>
                            <ListItem>
                                {imagePath}
                            </ListItem>
                        </List>                   
                </DialogContent>
                    <Box flexGrow="1"></Box>
                    <Button variant='contained' sx={{width: 'sm'}} color='secondary' fullWidth={false} onClick={uploadHandler}>Загрузить</Button>   
            </Dialog>
        </>
    )
}

export default Upload