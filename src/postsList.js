(function() {
  'use strict';
  populateSideBar()

  // render createPostButton
  request(`/posts`, 'get')
  .then (response => {
    const createPost = document.getElementById('create-post').addEventListener('click', function(event){
      clearSectionById('view')
      populatePostForm(response, 'create')
    })
  })
})();
