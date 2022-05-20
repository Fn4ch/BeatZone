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
    app.use(cookieParser())

    var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true 
    }

    app.use(express.json({ limit: '50mb' }))
    app.use(cors(corsOptions))
  

    const context = async request => {
        let authToken = null
        let currentUser = null
        const { headers } = request.req
        try {
            authToken = headers.authorization || ""
            if (authToken) {
            currentUser = jwt.verify(authToken, JWT_SECRET);
            }
            } catch (error) {
            throw new AuthenticationError(
            "Authentication token is invalid, please log in"
            )}
        return { request, currentUser }
    }

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true, 
        context
    })    
       
    await apolloServer.start()


    apolloServer.applyMiddleware({app})

    await mongoose.connect('mongodb+srv://user:user123@cluster0.o2nty.mongodb.net/kopat?retryWrites=true&w=majority',{                         
        useUnifiedTopology : true,
        useNewUrlParser : true
    })
    console.log("mongoose conected...")
    
    app.listen( port, ()=> console.log(`Server started: http://localhost:${port}`))


}
startServer()