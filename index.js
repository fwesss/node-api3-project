import dotenv from 'dotenv'
import server from './server'

dotenv.config()

const port = process.env.PORT || 5000

server.listen(port, () =>
  console.info(`\n*** Server Running on http://localhost:${port} ***\n`)
)
