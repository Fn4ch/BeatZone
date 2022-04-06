const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const resolvers = require('./Schema/resolvers')
const typeDefs = require('./Schema/typeDefs')
const express = require('express')
const cors = require('cors')

async function startServer(){
    const app = express()

    app.use(cors)

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    })    
       
    await apolloServer.start()

    apolloServer.applyMiddleware({app})

    await mongoose.connect('mongodb+srv://user:user123@cluster0.o2nty.mongodb.net/kopat?retryWrites=true&w=majority',{                         
        useUnifiedTopology : true,
        useNewUrlParser : true
    })
    console.log("mongoose conected...")
    
    app.listen( {port:5000}, ()=> console.log("server started on 5000 port"))
}
startServer()