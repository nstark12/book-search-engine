const connection = require('../config/connection')
const { User } = require('../models')

connection.once('open', async () => {
    await User.deleteMany()
    await User.create({
        username: 'Nicole',
        email: 'nicole@email.com',
        password: '12345'
    })
    console.log("SEEDS DONE")
    process.exit(0)
})