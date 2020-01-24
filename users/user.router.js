import express from 'express'
import Validation from 'folktale/validation'
import { validator, didItValidate } from '../utils/validator'
import { getById } from './user.model'
import userControllers from './user.controllers'
import postControllers from '../posts/post.controllers'

const { Success } = Validation

const router = express.Router()

const hasBody = req => !!req.body
const hasName = req => !!req.body.name
const hasText = req => !!req.body.text

const userDataValidator = validator('missing user data', hasBody)
const nameValidator = validator('missing required name field', hasName)
const postDataValidator = validator('missing post data', hasBody)
const textValidator = validator('missing required text field', hasText)

const userValidationResult = req =>
  Success()
    .concat(userDataValidator(req))
    .concat(nameValidator(req))

const postValidationResult = req =>
  Success()
    .concat(postDataValidator(req))
    .concat(textValidator(req))

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
  const didUserValidate = didItValidate(userValidationResult(req))

  if (!didUserValidate) {
    res.status(400).json({ errors: userValidationResult(req).value })
  } else {
    next()
  }
}

const validatePost = (req, res, next) => {
  const didPostValidate = didItValidate(postValidationResult(req))

  if (!didPostValidate) {
    res.state(400).json({ errors: postValidationResult(req).value })
  } else {
    req.body.user_id = req.params.id
    next()
  }
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
