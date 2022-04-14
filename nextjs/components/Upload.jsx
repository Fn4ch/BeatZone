import { Dialog, DialogContent, DialogTitle, Typography, IconButton, Box, Input, List, ListItem, Button} from '@mui/material'
import { useState, useCallback } from 'react'
import { UploadFile } from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import { gql, useMutation } from '@apollo/client'



const Upload = () =>{

    const [drag, setDrag] = useState(false)

    const [open, setOpen] = useState(false)

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

    const onDrop = (e) => useCallback(acceptedFiles => {
        let uploadedFiles = [...e.dataTranfer.uploadedFiles]
        document.getElementById[acceptedFiles]
        console.log(acceptedFiles)
      }, [])
      
    const {getRootProps, getInputProps, acceptedFiles} = useDropzone({onDrop})
    
    const files = acceptedFiles.map(file => <Typography key={file.path} >{file.path}</Typography>)

    const addTrackMutation = gql`
        mutation addTrack($input: addTrackInput){
        addTrack(input: $input){
            name
        }
    }`

    const [addTrack, {data, loading, error}] = useMutation(addTrackMutation)

    if(loading) return 'Submitting...'
    if(error) return `'Submition error!' ${error.message}`

    const uploadHandler = () =>{

    }

    return(
        <>            
            <IconButton onClick={handleClickOpen}><UploadFile fontSize='large' color='secondary' /></IconButton>
            <Dialog
                fullWidth='lg'
                maxWidth='lg'
                open={open}
                onClose={handleClickClose}
            >                
                <DialogTitle sx={{mx:'auto'}}>Upload files</DialogTitle>
                <DialogContent sx={{width:'lg', height:'500px', display:'flex', alignContent:'center', alignItems: 'center', justifyContent:'center', flexDirection:'column'}}>
                    <div {...getRootProps()}>
                        <input {...getInputProps()}/>
                        <Typography>Перенесите файлы или нажмите чтобы открыть</Typography>
                    </div>                      
                </DialogContent>
                    <Box flexGrow="1"></Box>
                    <Box sx={{mb:'5', display:'flex' , justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                        <Typography variant="h4" ></Typography>
                        <List>
                            <ListItem>{files}</ListItem>
                        </List>
                    </Box>
                    <Button onClick={uploadHandler}>Загрузить</Button>   
            </Dialog>
        </>
    )
}

export default Upload