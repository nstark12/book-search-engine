const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { typeDefs, resolvers } = require('./schemas')
const { authMiddleware } = require('./utils/auth')

const app = express();
const PORT = process.env.PORT || 3001;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}


db.once('open', async () => {
  
  await apolloServer.start()
  
  app.use('/graphql', expressMiddleware(apolloServer, {
    context: authMiddleware
  }));

  app.listen(PORT, () => {
    console.log(`🌍 Now listening on http://localhost:${PORT}`)
    console.log(`GraphQL available at http://localhost:${PORT}/graphql`)
  });
});
