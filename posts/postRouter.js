import { Router } from 'express'
import controllers from './postControllers'

const router = Router()

// custom middleware

const validatePostId = (req, res, next) => {
  // do your magic!
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
