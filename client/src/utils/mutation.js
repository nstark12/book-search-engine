import { gql } from '@apollo/client'

export const LOGIN_USER = gql `
    mutation LOGIN_USER($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
        }
    }
`

export const ADD_USER = gql `
    mutation ADD_USER($email: String!, $password: String!, $username: String!) {
        addUser(email: $email, password: $password, username: $username) {
        token
        user {
            _id
            username
        }
        }
    }
`

export const SAVE_BOOK = gql`
    mutation SAVE_BOOK($bookData: BookInput!) {
        saveBook(bookData: $bookData) {
        _id
        email
        username
        bookCount
        savedBooks {
            authors
            bookId
            description
            image
            link
            title
        }
        }
    }
`

export const REMOVE_BOOK = gql`
    mutation REMOVE_BOOK($bookId: ID!) {
        removeBook(bookID: $bookId) {
        _id
        email
        username
        bookCount
        savedBooks {
            authors
            bookId
            description
            image
            title
            link
        }
        }
    }
`