function request(path, method = 'get', body = null) {
  return axios(`http://localhost:3000${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: body
  })
}

function populateSideBar() {
  let id
  request(`/posts`, 'get')
    .then(allPosts => {
      const { data } = allPosts.data
      const sidebar = document.getElementById('sidebar')
      const listGroup = document.createElement('ul')
      listGroup.classList.add('list-group')
      data.forEach(blogPost => {
        const sidebar = document.getElementById('sidebar')
        const post = document.createElement('div')
        sidebar.appendChild(post)
        post.classList.add('list-group-item', 'list-group-item-action')
        post.id = blogPost.id
        post.innerHTML = blogPost.title
        post.addEventListener('click', event => {
          request(`/posts/${event.target.id}`, 'get')
            .then(response => {
              clearSectionById('view')
              populateView(response)
            })
        })
      })
      return allPosts
    })
}

function populateView(response) {
  const post = response.data.data
  console.log(post)
  // Populate the right column
  // section
  const view = document.getElementById('view')
  const section = document.createElement('section')
  view.appendChild(section)
  // header
  const header = document.createElement('header')
  section.appendChild(header)
  // h2
  const h2 = document.createElement('h2')
  header.appendChild(h2)
  h2.innerHTML = post.title
  // article
  const article = document.createElement('article')
  section.appendChild(article)
  // p
  const p = document.createElement('p')
  article.appendChild(p)
  p.innerHTML = post.content
  // aside
  const aside = document.createElement('aside')
  section.appendChild(aside)
  // ul
  const ul = document.createElement('ul')
  aside.appendChild(ul)
  ul.classList.add('nav', 'justify-content-end')

  // edit
  const liEdit = document.createElement('li')
  ul.appendChild(liEdit)
  liEdit.classList.add('nav-item')
  const editButton = document.createElement('div')
  liEdit.appendChild(editButton)
  editButton.classList.add('nav-link')
  editButton.innerHTML = 'Edit'
  editButton.addEventListener('click', event => {
    clearSectionById('view')
    populatePostForm(response, 'update')
  })

  // delete
  const liDelete = document.createElement('li')
  ul.appendChild(liDelete)
  liDelete.classList.add('nav-item')
  const deleteButton = document.createElement('div')
  liDelete.appendChild(deleteButton)
  deleteButton.classList.add('nav-link', 'text-danger')
  deleteButton.innerHTML = 'Delete'
  deleteButton.addEventListener('click', event => {
    request(`/posts/${post.id}`, 'delete')
    .then(putResponse => {
      clearSectionById('sidebar')
      populateSideBar()
      clearSectionById('view')
    })
  })
}

function clearSectionById(cssId) {
  const section = document.getElementById(cssId)
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }
}

function populatePostForm(response, type) {
  const id = response.data.data.id
  const view = document.getElementById('view')
  const form = document.createElement('form')
  view.appendChild(form)
  form.id = 'post-form'

  const titleGroup = document.createElement('div')
  form.appendChild(titleGroup)
  titleGroup.classList.add('form-group')
  const titleLabel = document.createElement('label')
  titleGroup.appendChild(titleLabel)
  titleLabel.for = 'title'
  titleLabel.innerHTML = 'Title'
  const titleInput = document.createElement('input')
  titleGroup.appendChild(titleInput)
  titleInput.type = 'text'
  titleInput.id = 'title'
  titleInput.innerHTML = 'Title'
  titleInput.classList.add('form-control')

  //content group
  const contentGroup = document.createElement('div')
  form.appendChild(contentGroup)
  contentGroup.classList.add('form-group')
  const contentLabel = document.createElement('label')
  contentGroup.appendChild(contentLabel)
  contentLabel.for = 'content'
  contentLabel.innerHTML = 'Content'
  const contentInput = document.createElement('input')
  contentGroup.appendChild(contentInput)
  contentInput.type = 'text'
  contentInput.id = 'content'
  contentInput.innerHTML = 'Content'
  contentInput.classList.add('form-control')

  //submit button
  const submitButton = document.createElement('button')
  form.appendChild(submitButton)
  submitButton.type = "submit"
  submitButton.classList.add('btn', 'btn-primary', 'btn-large')

  // Update Post
  if (type == 'update') {
    submitButton.innerHTML = 'Update Post'
    document.getElementById('post-form').addEventListener('submit', function(event) {
      event.preventDefault()
      const title = event.target.title.value
      const content = event.target.content.value
      request(`/posts/${id}`, 'put', { title, content })
      .then(putResponse => {
        clearSectionById('sidebar')
        populateSideBar()
        clearSectionById('view')
        populateView(putResponse)
      })
    })
  } else if (type == 'create') {
    submitButton.innerHTML = 'Create Post'
    document.getElementById('post-form').addEventListener('submit', function(event) {
      event.preventDefault()
      const title = event.target.title.value
      const content = event.target.content.value
      request(`/posts`, 'post', { title, content })
      .then(postResponse => {
        clearSectionById('sidebar')
        populateSideBar()
        clearSectionById('view')
        populateView(postResponse)
      })
    })
  }
}

function populateSubmitButton() {

}
