import { Dialog, DialogContent, DialogTitle, Typography, IconButton, Box} from '@mui/material'

const Error = (error, value) => {
    setOpen = value
    const [open, setOpen] = useState(false)

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
                    <Typography variant='h4' sx={{my:3}}>{error}</Typography>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default Error