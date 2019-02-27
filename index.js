const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = new express()

const passport = require('passport')
const passportJWT = require('passport-jwt')
const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt
const knex = require('knex')
const knexDb = knex({client: 'pg', connection: 'postgres://localhost/jwt_test'})
const bookshelf = require('bookshelf')
const securePassword = require('bookshelf-secure-password')
const db = bookshelf(knexDb)
db.plugin(securePassword)

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY
}

const strategy = new JwtStrategy(opts, (payload, next) => {
  // TODO: get user from DB
  const user = null
  next(null, user)
})
passport.use(strategy)
app.use(passport.initialize())

app.get('/', (req, res) => {
  res.send('Hello world')
})

const PORT = process.env.PORT || 3000
app.listen(PORT)