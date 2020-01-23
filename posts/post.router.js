import express from 'express'
import { getById as getPostById } from './post.model'
import controllers from './post.controllers'
import { getById as getUserById } from '../users/user.model'

const router = express.Router()

const validatePostId = async (req, res, next) => {
  try {
    const post = await getPostById(req.params.id)
    if (post) {
      req.post = post
      next()
    } else {
      res.status(400).json({ message: 'invalid post id' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'post information could not be retrieved' })
  }
}

const validatePost = async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: 'missing post data' })
  }

  if (!req.body.text) {
    res.status(400).json({ message: 'missing required text field' })
  }

  if (!req.body.user_id) {
    res.status(400).json({ message: 'missing required user_id field' })
  }

  try {
    const user = await getUserById(req.body.user_id)
    if (!user) {
      res.status(404).json({ message: 'user does not exist' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'user information could not be retrieved' })
  }

  next()
}

router.use('/:id', validatePostId)

router.route('/').get(controllers.getMany)

router
  .route('/:id')
  .get(controllers.getOne)
  .put(validatePost, controllers.updateOne)
  .delete(controllers.removeOne)

export default router
