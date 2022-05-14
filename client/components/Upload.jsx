import { Dialog, DialogContent, DialogTitle, Typography, IconButton, Box, Input, List, ListItem, Button, TextField, Stack} from '@mui/material'
import { useState, useCallback, useEffect } from 'react'
import { UploadFile } from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import { gql, useMutation } from '@apollo/client'



const Upload = () =>{

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
                setTrackAudio(reader.result)
                console.log(reader.result)               
            }
            reader.readAsDataURL(file)
        })
    }, [])    

    const {getRootProps, getInputProps, acceptedFiles } = useDropzone({onDrop, maxFiles: 1})


    if(loading) return 'Submitting...'
    if(error) return `'Submition error!' ${error.message}`

    function uploadImage(){
        const formData = new FormData()
        formData.append('file', trackImage )
        formData.append('upload_preset', 'beatzone')
        const url = await fetch('https://api.cloudinary.com/v1_1/dxegpqszm/image/upload', {
            method: 'POST',
            body: formData
        }).then(r => {
            console.log(r)
            r.json()
        })
    }

    function uploadAudio(){
        const formData = new FormData()
        formData.append('file', trackAudio )
        formData.append('upload_preset', 'beatzone')
        const url = await fetch('https://api.cloudinary.com/v1_1/dxegpqszm/video/upload', {
            method: 'POST',
            body: formData
        }).then(r => {
            console.log(r)
            r.json()
        })
    }

    

    const uploadHandler = async (e) =>{
        e.preventDefault()
        console.log(track, 'Загружаемый трек')
        uploadAudio()

    }

    const files = acceptedFiles.map(file => <Typography key={file.path} >{file.path}</Typography>)

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
                    <Stack spacing={4} marginLeft={4}>
                        <TextField sx={{width: 300}}  type='text' id='name' label='Название' size='small' onChange={changeHandler('name')}></TextField>
                        <TextField sx={{width: 300}}  type='text' id='description' label='Описание' size='small' onChange={changeHandler('description')}></TextField>
                    </Stack>
                    <Box margin={4}>
                        <div {...getRootProps()}>
                            <input {...getInputProps()}/>
                            <Typography height={200}>Нажмите для выбора аудиофайла</Typography>
                            <List>
                                <ListItem>
                                {files}
                                </ListItem>
                            </List>
                        </div> 
                    </Box>                     
                </DialogContent>
                    <Box flexGrow="1"></Box>
                    <Button variant='contained' sx={{width: 'sm'}} color='secondary' fullWidth={false} onClick={uploadHandler}>Загрузить</Button>   
            </Dialog>
        </>
    )
}

export default Upload