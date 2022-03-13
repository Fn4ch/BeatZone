const {ApolloServer} = require('apollo-server-express')
const typeDefs = require('./Schema/typeDefs')
const mongoose = require('mongoose')
const resolvers = require('./Schema/resolvers')

async function startServer(){

    const app = require('express')

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    })
       
    await apolloServer.start()

    apolloServer.applyMiddleware({app : app})

    await mongoose.connect('mongodb+srv://user:user123@cluster0.o2nty.mongodb.net/kopat?retryWrites=true&w=majority',{
        useUnifiedTopology : true,
        useNewUrlParser : true
    })
    console.log("mongoose conected...")
    
    app.listen( {port:5000}, ()=> console.log("server started on 5000 port"))
}
 startServer()