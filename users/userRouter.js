import express from 'express'
import { getById } from './userDb'
// import controllers from './userControllers'

const router = express.Router()

// custom middleware

const validateUserId = async (req, res, next) => {
  try {
    const user = await getById(req.params.id)
    if (user) {
      req.user = user
    } else {
      res.status(400).json({ message: 'invalid user id' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'user information could not be retrieved' })
  }

  next()
}

const validateUser = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: 'missing user data' })
  }

  if (!req.body.name) {
    res.status(400).json({ message: 'missing required name field' })
  }

  next()
}

const validatePost = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: 'missing post data' })
  }

  if (!req.body.text) {
    res.status(400).json({ message: 'missing required text field' })
  }

  next()
}

router.use('/:id', validateUserId)

router
  .route('/')
  .get((req, res) => {
    // do your magic!
  })
  .post(validateUser, (req, res) => {
    // do your magic!
  })

router
  .route('/:id/posts')
  .get((req, res) => {
    // do your magic!
  })
  .post(validatePost, (req, res) => {
    // do your magic!
  })

router
  // .use(validateUserId)
  .route('/:id')
  .get((req, res) => {
    // do your magic!
  })
  .put((req, res) => {
    // do your magic!
  })
  .delete((req, res) => {
    // do your magic!
  })

export default router
