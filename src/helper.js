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

function populateView (response) {
  const post = response.data.data
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
        clearView()
        populateUpdatePostForm()
      })
      // delete
      const liDelete = document.createElement('li')
      ul.appendChild(liDelete)
      liDelete.classList.add('nav-item')
      const deleteButton = document.createElement('div')
      liDelete.appendChild(deleteButton)
      deleteButton.classList.add('nav-link', 'text-danger')
      deleteButton.innerHTML = 'Delete'
}

function clearView() {
  const view = document.getElementById('view')
  while (view.firstChild) {
    view.removeChild(view.firstChild);
  }
}

function populateUpdatePostForm () {
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

  //submit button
}
