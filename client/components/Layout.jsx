import NavBar from './NavBar'
import Footer from './Footer'
import MusicPlayer from './player'

export default function Layout({children}){
    return(
        <>
            <NavBar/>      
                <main>
                    {children}
                </main>
            <MusicPlayer/>
        </>
    )
}