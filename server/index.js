const { ApolloServer, AuthenticationError } = require('apollo-server-express')
const mongoose = require('mongoose')
const resolvers = require('./Schema/resolvers')
const typeDefs = require('./Schema/typeDefs')
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
require("dotenv").config()
var cookieParser = require('cookie-parser')

const JWT_SECRET = process.env.JWT_SECRET || "secret"

async function startServer(){

    const port = 5000

    const app = express()
    
    var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: 'true' 
    }

    app.use(cors(corsOptions))

    app.use(cookieParser())
    app.use(express.json({ limit: '50mb' }))
    
     

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        context: ({req}) =>{ 
            const ctx = username = {username: null}
            try{
                if(req.headers["authorization"] )
                {
                    const token = jwt.verify(
                        req.headers["authorization"],
                        JWT_SECRET
                    )
                    ctx.username = token.data
                    console.log(token.data)
                }                
            }
            catch (e) {}
            return ctx
         } 
        
    })    
       
    await apolloServer.start()


    apolloServer.applyMiddleware({app})

    await mongoose.connect('mongodb+srv://user:user123@cluster0.o2nty.mongodb.net/kopat?retryWrites=true&w=majority',{                         
        useUnifiedTopology : true,
        useNewUrlParser : true
    })
    console.log("mongoose conected...")
    
    app.listen( port , ()=> console.log(`Server started: http://localhost:${port}`))


}
startServer()