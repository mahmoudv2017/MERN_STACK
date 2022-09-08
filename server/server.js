const express = require('express')
const app = express()
const colors = require('colors')
const schema = require('./schema/schema')
const {graphqlHTTP} = require('express-graphql')
require('dotenv').config()
const Client = require('./models/Client')
const {connectionDB} = require('./config/db')


//connecting to database
connectionDB().
then( async () => {


    app.listen(process.env.PORT, () => console.log(colors.blue.underline(`Server is  on ${process.env.PORT}`)) )

})





app.get('/' , (_,res) => {
    res.status(200).send('Hello from express')
})

app.use('/graphql' , graphqlHTTP({
    schema,
    graphiql : process.env.NODE_ENV === 'development'
}))