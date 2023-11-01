const { GraphQLError } = require('graphql')
const { BAD_USER_INPUT } = require('@apollo/server/errors')
const { User } = require('../models')

const resolvers = {
    Query: {
        users: async () => {
            return await User.find().populate('')
        }
    }
}

module.exports = resolvers