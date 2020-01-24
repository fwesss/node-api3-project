import express from 'express'
import Validation from 'folktale/validation'
import { validator, didItValidate } from '../utils/validator'
import { getById as getPostById } from './post.model'
import controllers from './post.controllers'
import { getById as getUserById } from '../users/user.model'

const { Success } = Validation

const router = express.Router()

const hasBody = req => !!req.body
const hasText = req => !!req.body.text
const hasUserId = req => !!req.body.user_id

const bodyValidator = validator('missing post data', hasBody)
const textValidator = validator('missing required text field', hasText)
const userIdValidator = validator('missing required user_id field', hasUserId)

const postValidationResult = req =>
  Success()
    .concat(bodyValidator(req))
    .concat(textValidator(req))
    .concat(userIdValidator(req))

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
  const didPostValidate = didItValidate(postValidationResult(req))

  if (!didPostValidate) {
    res.status(400).json({
      errors: postValidationResult(req).value,
    })
  } else {
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
}

router.use('/:id', validatePostId)

router.route('/').get(controllers.getMany)

router
  .route('/:id')
  .get(controllers.getOne)
  .put(validatePost, controllers.updateOne)
  .delete(controllers.removeOne)

export default router
