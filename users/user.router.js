import express from 'express'
import { getById } from './user.model'
import userControllers from './user.controllers'
import postControllers from '../posts/post.controllers'

const router = express.Router()

const validateUserId = async (req, res, next) => {
  try {
    const user = await getById(req.params.id)
    if (user) {
      req.user = user
      next()
    } else {
      res.status(400).json({ message: 'invalid user id' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'user information could not be retrieved' })
  }
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

  req.body.user_id = req.params.id

  next()
}

router.use('/:id', validateUserId)

router
  .route('/')
  .get(userControllers.getMany)
  .post(validateUser, userControllers.createOne)

router
  .route('/:id/posts')
  .get(userControllers.getManyUserPosts)
  .post(validatePost, postControllers.createOne)

router
  .route('/:id')
  .get(userControllers.getOne)
  .put(validateUser, userControllers.updateOne)
  .delete(userControllers.removeOne)

export default router
