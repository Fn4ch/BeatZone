import { Dialog, DialogContent, DialogTitle, Typography, IconButton, Box, Input, List, ListItem, Button, TextField, Stack} from '@mui/material'
import { useState, useCallback, useEffect } from 'react'
import { UploadFile } from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import { gql, useMutation } from '@apollo/client'



const Upload = () =>{

    const [drag, setDrag] = useState(false)

    const [open, setOpen] = useState(false)

    const [track, setTrack] = useState()

    const [trackData, setTrackData] = useState({
        name: '',
        author: '',
        description: '',
        url: ''
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
                setTrack(reader.result)
                console.log(reader.result)               
            }
            reader.readAsDataURL(file)
            console.log('file', file)
        })
    }, [])    

    const {getRootProps, getInputProps, acceptedFiles } = useDropzone({onDrop, maxFiles: 1})


    const UPLOAD_FILE = gql`
        mutation uploadFile($file: Upload!){
            uploadFile(file: $file)
        }
    `

    const [uploadFile, {data, loading, error}] = useMutation(UPLOAD_FILE, {onCompleted: data => console.log(data)})

    if(loading) return 'Submitting...'
    if(error) return `'Submition error!' ${error.message}`

    

    const uploadHandler = (e) =>{
        e.preventDefault()
        console.log(track, 'Загружаемый трек')
        uploadFile({variables: {file: track}})
        
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
                            <Typography>Нажмите для выбора аудиофайла</Typography>
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