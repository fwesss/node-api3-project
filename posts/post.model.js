import db from '../data/dbConfig'

export const get = () => db('posts')

export const getById = id =>
  db('posts')
    .where({ id })
    .first()

export const insert = post =>
  db('posts')
    .insert(post)
    .then(ids => getById(ids[0]))

export const update = id => changes =>
  db('posts')
    .where({ id })
    .update(changes)

export const remove = id =>
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
