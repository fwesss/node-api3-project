import express from 'express'
import userRouter from './users/user.router'
import postRouter from './posts/post.router'

const server = express()

const logger = (req, _res, next) => {
  console.log(`${req.method} to ${req.url} at ${Date()}`)
  next()
}

server.use(express.json())
server.use(logger)
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.get('/', (_req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

export default server
