let postWrapper = document.getElementById('post-holder')
let postBox = []
let postForm = document.getElementById('post-form')
let title = document.getElementById('title')
let body = document.getElementById('body')

// GETTING POST
function getPost(){
  fetch('https://jsonplaceholder.typicode.com/posts')
.then((response) => response.json())
.then((data) => {
  console.log(postBox)  
  postBox = data
  let postHolder = ''
  postBox.forEach(post => {
  //  console.log(post)
    postHolder += `
    <div class="col-lg-6 col-md-12">
                  <div class="card  mt-5 ">
                      <div class="card-body">
                      <p>${post.id}</p>  
                      <p id="post-title">${post.title}</p>
                          <p id="post-body">${post.body}</p>
                      </div>
                      
                          <div class="d-flex justify-content-between">
                          <button type="submit" class="btn btn-primary mb-2 m-2" onclick="updatePost(${post.id})">Update Post</button>
                          <button type="submit" class="btn btn-primary mb-2 m-2" onclick="viewPost(${post.id})">View Post</button>
                          <button type="submit" class="btn btn-danger mb-2  m-2" onclick="deletePost(${post.id})">Delete Post</button>
                          </div>

                      
                  </div>
              </div>
    `
  });
    

    postWrapper.innerHTML = postHolder
});
}
getPost()


// ADDING POST

postForm.addEventListener('submit', createPost)

function createPost(e){
  e.preventDefault()
alert('create post?')
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: title.value,
      body:  body.value,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)

      let postHolder = ''
      postBox.unshift(data)
      postBox.forEach(post => {
        console.log(post)
         postHolder += `
         <div class="col-lg-6 col-md-12">
                       <div class="card">
                           <div class="card-body py-3">
                           <p>${post.id}</p>  
                           <p id="post-title">${post.title}</p>
                               <p id="post-body">${post.body}</p>
                           </div>
                           
                               <div class="d-flex justify-content-between">
                               <button type="submit" class="btn btn-primary mb-2 m-2" onclick="updatePost(${post.id})">Update Post</button>
                               <button type="submit" class="btn btn-primary mb-2 m-2" onclick="viewPost(${post.id})">View Post</button>
                               <button type="submit" class="btn btn-danger mb-2 m-2" onclick="deletePost(${post.id})">Delete Post</button>
                               </div>
   
                           
                       </div>
                   </div>
         `
       });
         
   
         postWrapper.innerHTML = postHolder
    });


}



// UPDATING A POST
function updatePost(id){
  alert('updating post')
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  method: 'PUT',
  body: JSON.stringify({
    id: id,
    title: title.value,
    body: body.value,
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    let postTitles = document.querySelectorAll('#post-title')
    let postBodies = document.querySelectorAll('#post-body')
    postTitles.forEach((postTitle, index) => {
        if (index+1 === id){
          if(data.title !== ''){
            postTitle.innerHTML = data.title
          }
        }

    })
    postBodies.forEach((postBody, index) => {
        if (index+1 === id){
          if(data.body !== ''){         
             postBody.innerHTML = data.body
            }

        }

    })
  });
}


// VIEWING OF PAGE
function viewPost(id){
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
   localStorage.setItem('viewedPost', JSON.stringify(data))
    window.location.href = 'view.html'
  });
}



// DELETING PAGE

function deletePost(id){
  alert('deleting!!')
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  method: 'DELETE',
})

.then((response) => response.json())
.then((data) => {
console.log(data)
postBox = postBox.filter(post => post.id !==id)
console.log(postBox)
let postHolder = ''
      // postBox.push(data)
      postBox.forEach(post => {
        console.log(post)
         postHolder += `
         <div class="col-lg-6 col-md-12 py-3">
                       <div class="card  mb-3">
                           <div class="card-body">
                           <p>${post.id}</p>  
                           <p id="post-title">${post.title}</p>
                               <p id="post-body">${post.body}</p>
                           </div>
                           
                               <div class="d-flex justify-content-between">
                               <button type="submit" class="btn btn-primary mb-2 m-2 " onclick="updatePost(${post.id})">Update Post</button>
                               <button type="submit" class="btn btn-primary mb-2 m-2" onclick="viewPost(${post.id})">View Post</button>
                               <button type="submit" class="btn btn-danger mb-2 m-2" onclick="deletePost(${post.id})">Delete Post</button>
                               </div>
   
                           
                       </div>
                   </div>
         `
       });
         
   
         postWrapper.innerHTML = postHolder
});
}