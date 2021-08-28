const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('books');
        },
        user: async (parent, {username}) => {
            return User.findOne({ username }).populate('books')
        },
        books: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Book.find(params)
        },
        book: async (parent, {bookId}) => {
            return Book.findOne({ _id: bookId })
       },
       me: async (parent, args, context) => {
           if (context.user) {
               return User.findOne( { _id: context.user._id}).populate('books');
           }
           throw new AuthenticationError('You need to be logged in!')
       },
    },

    Mutation: {
        createUser: async (parent, { username, email, password }) => {
          const user = await User.create({ username, email, password });
          const token = signToken(user);
          return { token, user };
        },
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw new AuthenticationError('No user found with this email address');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }
    
          const token = signToken(user);
    
          return { token, user };
        },
        saveBook: async (parent, { saveBookDetails, token}, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    {token: token},
                    {$addToSet: { savedBooks: saveBookDetails}},
                    {new: true}
                )
            }
        },
        deleteBook: async (parent, { bookId, token}, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    {token: token},
                    {$pull: {savedBooks: {bookId: bookId}}},
                    {new: true}
                );
            }
        },
}}

module.exports = resolvers;