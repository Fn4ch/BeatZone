const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const resolvers = require('./Schema/resolvers')
const typeDefs = require('./Schema/typeDefs')
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { graphqlUploadExpress } = require('graphql-upload')

const JWT_SECRET = process.env.JWT_SECRET || "secret"

async function startServer(){
    const app = express()

    var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true 
  }
  app.use(express.json({ limit: '50mb' }))
  app.use(cors(corsOptions))
  

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true, 
        context: ({req}) =>{ 
            const ctx = email = {email: null}
            try{
                if(req.headers["authorization"] )
                {
                    const token = jwt.verify(
                        req.headers["authorization"],
                        JWT_SECRET
                    )
                    ctx.email = token.data
                }                
            }
            catch (e) {} 
            return ctx     
        }      
    })    
       
    await apolloServer.start()

    app.use(graphqlUploadExpress())

    apolloServer.applyMiddleware({app})

    await mongoose.connect('mongodb+srv://user:user123@cluster0.o2nty.mongodb.net/kopat?retryWrites=true&w=majority',{                         
        useUnifiedTopology : true,
        useNewUrlParser : true
    })
    console.log("mongoose conected...")
    
    app.listen( {port:5000}, ()=> console.log("server started on port 5000"))


}
startServer()