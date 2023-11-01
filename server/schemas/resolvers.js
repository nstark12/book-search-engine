const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth')
const { User } = require('../models')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User
                    .findOne({ _id: context.user._id })
                    .select('-__v -password')
                    // .populate('book')
                
                    return userData
                }
            throw new AuthenticationError('Authentication error')
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })
            if (!user) {
                throw new AuthenticationError('Authentication error')
            }

            const correctPassword = await user.isCorrectPassword(password)

            if(!correctPassword) {
                throw new AuthenticationError('Authentication error')
            }

            const token = signToken(user)
            return { token, user }
        },

        addUser: async (parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)

            return {
                token,
                user
            }
        },

        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookData } },
                    { new: true } 
                )
                .populate('books')
                return updatedUser
            }
            throw new AuthenticationError('Authentication error')
        },

        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                )
                return updatedUser
            }
            throw new AuthenticationError('Authentication error')
        }
    }
}

module.exports = resolvers