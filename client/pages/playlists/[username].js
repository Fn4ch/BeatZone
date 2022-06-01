


export async function getStaticPaths() {

    const { data } =  await client.query({
        query: gql`
        query getAllUsers{
            getAllUsers{
                username    
            } 
        }
        `    
    })
    const users = data.getAllUsers
    const paths = users.map((user) => ({params: {username: user.username},}))
    return{        
        paths,
        fallback: false
    }
}

export async function getStaticProps({params})
{

    const { data } =  await client.query({
        query: gql`
        query getUerTracks($author: String){
            getUserTracks(author: $author){
                image 
                name
                audio 
                author                      
            } 
        }        
        `, variables: {author: params.username}},)

    return{
        props: {
            tracks : data.getUserTracks
        }
    }
}

const userTracksPage = ({playlists}) => {


const router = useRouter()
const {username} = router.query
console.log(username)

return(
    <Layout>
        <Typography marginTop={12} align="center" variant="h3">Плейлисты пользователя {username}</Typography>
            <Container width="lg" sx={{mt:8}}>
                <Box width='100%'>
                    <List sx={{width: '100%'}}>
                        {tracks.map((track) => 
                        (<ListItem key={track.id}>
                            <Paper sx={{width:'100%'}} color='secondary'>
                                <Stack direction='row' alignItems='center' justifyItems='flex-start' sx={{width: '100%'}} margin={1} marginBottom={0}>
                                        <Box onClick={()=>{}}>
                                            <Image src={track.image} alt="Img" width="60" height="60"></Image>
                                        </Box>
                                        <Box flexDirection="row" alignSelf='center' marginLeft={3} flexGrow={1}>
                                                <Typography  fontSize={20} sx={{mb: '3px'}}>{track.name}</Typography>
                                                <Typography button onClick={()=>{}} fontSize={12} sx={{mt: '6px'}} color='primary.light'>{track.author}</Typography>
                                        </Box>
                                        <Stack spacing={1} direction='row' alignItems='center' marginRight={4}>
                                            <Button size='small'  color='inherit'>
                                                <Add fontSize='large'/>
                                            </Button>
                                            <Button size='small' color='inherit' onClick={likeHandler}>
                                                {liked ? <FavoriteBorder /> : <Favorite />}
                                            </Button>
                                        </Stack>
                                </Stack>
                            </Paper>
                        </ListItem>))}
                    </List>
                </Box>
        </Container>
    </Layout>
)
}

export default userTracksPage

