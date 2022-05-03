import { Dialog, DialogContent, DialogTitle, Typography, IconButton, Box} from '@mui/material'
import { useState }  from 'react'

const Error = (errorMessage) => {


    const handleClickClose = () =>{
        setOpen(false)
    }
    
    return(
        <Dialog
        open={open}
        maxWidth='lg'
        fullWidth={true}   
        onClose={handleClickClose}     
        >
            <DialogTitle>Ошибка</DialogTitle>
            <DialogContent>
                <Box justifyContent='center' alignContent='center'>
                    <Typography variant='h4' sx={{my:3}}>{errorMessage}</Typography>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default Error