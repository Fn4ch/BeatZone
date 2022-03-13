import { Box, Grid, Typography } from '@mui/material'
import Container from '@mui/material'


export default function userPage() {
    return(
    <>
        <Container>
            <Grid container spacing="2">
                <Grid xs="12">
                    <Typography align="center" variant="h2">
                        Профиль
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    </>
)}