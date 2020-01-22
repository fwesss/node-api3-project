import db from '../data/dbConfig'

const get = () => db('users')

const getById = id =>
  db('users')
    .where({ id })
    .first()

const getUserPosts = userId =>
  db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .select('p.id', 'p.text', 'u.name as postedBy')
    .where('p.user_id', userId)

const insert = user =>
  db('users')
    .insert(user)
    .then(ids => getById(ids[0]))

const update = (id, changes) =>
  db('users')
    .where({ id })
    .update(changes)

const remove = id =>
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
