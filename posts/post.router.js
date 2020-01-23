import express from 'express'
import { getById } from './post.model'
import controllers from './post.controllers'

const router = express.Router()

const validatePostId = async (req, res, next) => {
  try {
    const post = await getById(req.params.id)
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

router.use('/:id', validatePostId)

router.route('/').get(controllers.getMany)

router
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
