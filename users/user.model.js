import db from '../data/dbConfig'

export const get = () => db('users')

export const getById = id =>
  db('users')
    .where({ id })
    .first()

export const getUserPosts = userId =>
  db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .select('p.id', 'p.text', 'u.name as postedBy')
    .where('p.user_id', userId)

export const insert = user =>
  db('users')
    .insert(user)
    .then(ids => getById(ids[0]))

export const update = id => changes =>
  db('users')
    .where({ id })
    .update(changes)

export const remove = id =>
  db('users')
    .where('id', id)
    .del()

export default {
  get,
  getById,
  getUserPosts,
  insert,
  update,
  remove,
}
