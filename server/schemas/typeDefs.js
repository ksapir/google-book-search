const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: String!
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID,
        user: User
    }

    type Query {
        me(email: String!): [User]
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(details: saveBookDetails!): User
        deleteBook(bookId: String!): User
    }

    input saveBookDetails {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }`;

    module.exports = typeDefs;
