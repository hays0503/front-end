const express = require('express');
const cors = require('cors');
const express_graphql = require('express-graphql');
const graphql_tools_schema = require('@graphql-tools/schema');

const app = express()
const port = 4000

// In-memory data store
const data = {
  warriors: [
    { id: '001', name: 'Jaime' },
    { id: '002', name: 'Jorah' },
  ],
}

// Schema
const typeDefs = `
type Warrior {
  id: ID!
  name: String!
}

type Query {
  warriors: [Warrior]
}
`

// Resolver for warriors
const resolvers = {
  Query: {
    warriors: (obj, args, context) => context.warriors,
  },
}

const executableSchema = graphql_tools_schema.makeExecutableSchema({
  typeDefs,
  resolvers,
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Entrypoint
app.use(
  '/graphql',
  express_graphql.graphqlHTTP({
    schema: executableSchema,
    context: data,
    graphiql: true,
  })
)

app.listen(port, () => {
  console.log(`Running a server at http://localhost:${port}`)
})