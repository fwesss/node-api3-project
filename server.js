import express from 'express'

const server = express()

// custom middleware

const logger = (req, _res, next) => {
  console.log(`${req.method} to ${req.url} at ${Date()}`)
  next()
}

server.use(logger)

server.get('/', (_req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

export default server
