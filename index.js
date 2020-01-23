import server from './server'

const port = process.env.PORT || 5000

server.listen(4000, () =>
  console.info(`\n*** Server Running on http://localhost:${port} ***\n`)
)
