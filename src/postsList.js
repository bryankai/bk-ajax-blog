(function() {
  'use strict';
  let id
  console.log('sidebar!')
    // load post information
    request(`/posts`, 'get')
    .then(response => {
      const {data} = response.data
      const sidebar = document.getElementById('sidebar')
      const listGroup = document.createElement('ul')
      listgroup.classList.add('list-group')
      data.forEach(blogPost => {
        const sidebar = document.getElementById('sidebar')
        const post = document.createElement('div')
        post.classList.add('list-group-item list-group-item-action')
        post.innerHTML = post.title
        post.addEventListener('click', event => {
          // Populate the right column
        })
        sidebar.appendChild(post)

      })
    })


  // Create New Post Event Listener
  // document.querySelector('.form-create-post').addEventListener('submit', function(event){
  //   event.preventDefault()
  //   const postName = event.target.name.value
  //   const description = event.target.description.value
  //   const users_id = id
  //   console.log(users_id)
  //   request(`/users/${id}/posts`, 'post', { postName , description, users_id })
  //   window.location = '/dashboard.html'
  // })


})();
