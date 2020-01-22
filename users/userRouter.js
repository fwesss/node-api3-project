import { Router } from 'express'
import controllers from './userControllers'

const router = Router()

// custom middleware

const validateUserId = (req, res, next) => {
  // do your magic!
}

const validateUser = (req, res, next) => {
  // do your magic!
}

const validatePost = (req, res, next) => {
  // do your magic!
}

router
  .route('/')
  .get((req, res) => {
    // do your magic!
  })
  .post((req, res) => {
    // do your magic!
  })

router
  .route('/:id/posts')
  .get((req, res) => {
    // do your magic!
  })
  .post((req, res) => {
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
