const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v4')
const file = path.join(__dirname, 'posts.json')
let index

function getAll (limit) {
  const contents = fs.readFileSync(file, 'utf-8')
  const posts = JSON.parse(contents)
  return limit ? posts.slice(0, limit) : posts
}

function getOne (id) {
  const contents = fs.readFileSync(file, 'utf-8')
  const posts = JSON.parse(contents)
  const post = posts.find(post => post.id === id)
  index = posts.indexOf(post)
  if (!post) return { errors:  `can not find ${id}`}
  return post
}

function create (name, borrowed=false, description='', authors) {
  const contents = fs.readFileSync(file, 'utf-8')
  const posts = JSON.parse(contents)
  const errors = []
  let response
  if (!name) {
    errors.push('name is required')
    response = { errors }
  } else if (!borrowed && !typeof borrowed === 'boolean') {
      errors.push('borrowed status is required')
      response = { errors }
  } else {
    const authorsArr = authors.split(',')
    // Need to create uuid for each author, put it in an object with two keys: name and id
    // authors will be an array of objects
    const post = { id: uuid(), name: name, borrowed: borrowed, description:description, authors:authorsArr }
    posts.push(post)
    response = post
    const json = JSON.stringify(posts)
    fs.writeFileSync(file, json)
  }
  return response
}

function update (id, name) {
  const contents = fs.readFileSync(file, 'utf-8')
  const posts = JSON.parse(contents)
  const post = getOne(id)
  posts[index].name = name
  const json = JSON.stringify(posts)
  fs.writeFileSync(file, json)
  return posts[index]
}

function remove (id) {
  const contents = fs.readFileSync(file, 'utf-8')
  const posts = JSON.parse(contents)
  const post = getOne(id)
  const removedPost = posts.splice(index,1)
  const json = JSON.stringify(posts)
  fs.writeFileSync(file, json)
  return removedPost
}




module.exports = { getAll, getOne, create, update, remove }
