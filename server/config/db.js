const mongoose = require('mongoose')
const colors = require('colors')

const connectionDB = async () => {
    const connection = await mongoose.connect(process.env.URI)

    console.log( colors.cyan.underline(`connect to ${connection.connection.host}`))
}

module.exports = {connectionDB}