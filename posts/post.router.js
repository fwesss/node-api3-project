import { Router } from 'express'
import { getById } from './post.model'
import controllers from './postControllers'

const router = Router()

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

router.route('/').get((req, res) => {
  // do your magic!
})

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
