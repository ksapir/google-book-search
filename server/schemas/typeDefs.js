const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        savedBooks: [String]
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
        users: [Users]!
        user(userId: ID!): User
    }

    type Query {
        books: [Books]!
        title: String
        authors: [String]
    }

    typeMutation {
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
