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
            clearView()
            populateView(response)
          })
        })
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
