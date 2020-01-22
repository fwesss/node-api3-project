import db from '../data/dbConfig'

const get = () => db('posts')

const getById = id =>
  db('posts')
    .where({ id })
    .first()

const insert = post =>
  db('posts')
    .insert(post)
    .then(ids => getById(ids[0]))

const update = (id, changes) =>
  db('posts')
    .where({ id })
    .update(changes)

const remove = id =>
  db('posts')
    .where('id', id)
    .del()

export default {
  get,
  getById,
  insert,
  update,
  remove,
}
