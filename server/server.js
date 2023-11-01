const express = require('express');
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const path = require('path');
const db = require('./config/connection');

const { typeDefs, resolvers } = require('./schemas')
const { authMiddleware } = require('./utils/auth')

const PORT = process.env.PORT || 3005;
const app = express();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  persistedQueries: false
})



const startApolloServer = async (typeDefs, resolvers) => {
  await apolloServer.start()
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.use('/graphql', expressMiddleware(apolloServer, {
    context: authMiddleware
  }))

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on http://localhost:${PORT}`)
      console.log(`GraphQL available at http://localhost:${PORT}/graphql`)

    })
  })

};

startApolloServer()
