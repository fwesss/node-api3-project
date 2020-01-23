import { crudControllers } from '../utils/crud'
import User, { getUserPosts } from './user.model'

const getManyUserPosts = async (req, res) => {
  try {
    const posts = await getUserPosts(req.params.id)
    res.status(200).json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'The information could not be retrieved.' })
  }
}

export default { ...crudControllers(User), getManyUserPosts }
