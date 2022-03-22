import {ApolloServer} from 'apollo-server-express'
import typeDefs from './Schema/typeDefs'
import mongoose from 'mongoose'
import resolvers from './Schema/resolvers'
import express from 'express'

async function startServer(){
    const app = express();

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