import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!){
        loginUser(email: $email, password: $password) {
            token
            user
        }
    }`;

export const ADD_USER = gql`
    mutation createUser($email: String!, $username: String!, $password: String!) {
        createUser(email: $email, username: $username, password: $password) {
            token
            user
        }
    }`;

export const SAVE_BOOK = gql`
    mutation saveBook ($content: saveBookContent!) {
        saveBook (content: $content) {
            email
            username
            savedBooks
            bookCount
        }
    }`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId ) {
            email
            username
            savedBooks
            bookCount
        }
    }`;