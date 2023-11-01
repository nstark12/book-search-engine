const typeDefs = `

    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]

    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String!
        image: String
        link: String
        title: String!
    }

    input BookInput {
        authors: [String]
        description: String
        bookId: ID
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(email: String!, password: String!, username: String!): Auth
        saveBook(bookData: BookInput!): User
        removeBook(bookID: ID!): User
    }

`

module.exports = typeDefs