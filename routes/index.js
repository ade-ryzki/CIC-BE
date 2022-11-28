const express = require("express");
const app = express()
const portfolioRoute = require('./portfolioRoute')
const moviesRoute = require('./moviesRoute')
const usersRoute = require('./usersRoute')
const authRoute = require('./authRoute')

app.use('/portfolio', portfolioRoute)
app.use('/movies', moviesRoute)
app.use('/users', usersRoute)
app.use('/auth', authRoute)

module.exports = app

