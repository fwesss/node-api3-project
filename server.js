import express from 'express'

const server = express()

server.get('/', (_req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

export default server
