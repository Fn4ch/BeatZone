const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const resolvers = require('./Schema/resolvers')
const typeDefs = require('./Schema/typeDefs')
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || "secret"

async function startServer(){
    const app = express()

    var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true 
  };
  app.use(cors(corsOptions));

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req}) =>{ 
            const ctx = email = {email: null}
            try{
                if(req.headers["x-access-token"] )
                {
                    const token = jwt.verify(
                        req.headers["x-access-token"],
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

    apolloServer.applyMiddleware({app})

    await mongoose.connect('mongodb+srv://user:user123@cluster0.o2nty.mongodb.net/kopat?retryWrites=true&w=majority',{                         
        useUnifiedTopology : true,
        useNewUrlParser : true
    })
    console.log("mongoose conected...")
    
    app.listen( {port:5000}, ()=> console.log("server started on port 5000"))



}
startServer()