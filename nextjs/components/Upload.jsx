import { Dialog, DialogContent, DialogTitle, Typography, IconButton, Box} from '@mui/material'
import { useState } from 'react'
import { UploadFile } from '@mui/icons-material'

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
    
    const onDrop = (e) => {
        e.preventDefault()
        let files = [...e.dataTranfer.files]
        document.getElementById[files]
        console.log(files)
    } 
      

    return(
        <>
            <IconButton onClick={handleClickOpen}><UploadFile fontSize='large' color='secondary' /></IconButton>
            <Dialog
                fullWidth='lg'
                maxWidth='lg'
                open={open}
                onClose={handleClickClose}
                onMouseDown={handleClickClose}
            >
                <DialogTitle sx={{mx:'auto'}}>Upload files</DialogTitle>
                <DialogContent sx={{width:'lg', height:'500px', display:'flex', alignContent:'center', alignItems: 'center', justifyContent:'center'}}>
                    {drag ? <Typography variant='h4' sx={{display:'flex', my:'auto'}}>Перетащите файл для загрузки</Typography> : 
                    <div onDragStart={e => dragStart(e)} onDragLeave={dragLeave} onDragOver={e => dragStart(e)} onDrop={e => onDrop(e)}>
                        <Typography variant='h4' sx={{display:'flex', my:'auto'}}>Отпустите файлы для загрузки</Typography></div>}               
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Upload