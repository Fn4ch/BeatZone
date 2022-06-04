import NavBar from './NavBar'
import Footer from './Footer'
import MusicPlayer from './player'
import { Box } from '@mui/material'

export default function Layout({children}){
    return(
        <>
            <NavBar/>      
                <main>
                    {children}
                    <Box height={300}></Box>
                </main>                
                <Footer/>
            <MusicPlayer/>            
        </>
    )
}