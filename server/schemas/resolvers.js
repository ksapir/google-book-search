const { User } = require('../models');

const resolvers = {
    Query: {
       me: async (parent, args, context) => {
               return User.findOne( { _id: context.user._id}).populate('books');
       },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
          const user = await User.create({ username, email, password });
          const token = signToken(user);
          return { token, user };
        },
        loginUser: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw new Error('No user found with this email address');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new Error('Incorrect credentials');
          }
    
          const token = signToken(user);
    
          return { token, user };
        },
        saveBook: async (parent, { saveBookContent, token}) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    {token: token},
                    {$addToSet: { savedBooks: saveBookContent}},
                    {new: true}
                )
            }
        },
        removeBook: async (parent, { bookId, token}) => {
                return User.findOneAndUpdate(
                    {token: token},
                    {$pull: {savedBooks: {bookId: bookId}}},
                    {new: true}
                )
        },
}}

module.exports = resolvers;