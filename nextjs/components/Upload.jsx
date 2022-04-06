import { Dialog, DialogContent, DialogTitle, Typography, IconButton, Box, Input, List, ListItem} from '@mui/material'
import { useState, useCallback } from 'react'
import { UploadFile } from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import Dropzone from 'react-dropzone'



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

    const onDrop = useCallback(acceptedFiles => {
        event.preventDefault()
        let files = [...event.dataTranfer.files]
        document.getElementById[acceptedFiles]
        console.log(acceptedFiles)
      }, [])
      
    const {getRootProps, getInputProps, acceptedFiles} = useDropzone({onDrop})
    
    const files = acceptedFiles.map(file => <Typography key={file.path} >{file.path}</Typography>)

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
                    <Box sx={{mb:'5', display:'flex' , justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                        <Typography variant="h4" ></Typography>
                        <List>
                            <ListItem>{files}</ListItem>
                        </List>
                    </Box>   
            </Dialog>
        </>
    )
}

export default Upload