let postTitle = document.getElementById("title");
let postPrice = document.getElementById("price");
let postDescription = document.getElementById("description");
let addpostBtn = document.getElementById("add");
let updatepostBtn = document.getElementById("update");
let searchInput = document.getElementById("searchInput");
let totalPostsElement = document.getElementById("total");

let posts = [];
let globalId = "";

function getData() {
  fetch("https://crud-node-js.vercel.app/products")
    .then((response) => response.json())
    .then((data) => {
      posts = data;
      displayPosts();
      totalPostsElement.innerHTML = posts.length;
    });
}
getData();

function displayPosts() {
  let cartona = ``;

  for (let i = 0; i < posts.length; i++) {
    cartona += `
        <tr>
        <td>${[i + 1]}</td>
        <td>${posts[i].title}</td>
        <td>${posts[i].price}</td>
        <td>${posts[i].description}</td>
        <td class="actions">
            <button class="btn btn-update" onclick="setData(${i})">Update</button>
            <button class="btn btn-delete" onclick="deletePost(${
              posts[i].id
            })">Delete</button>
        </td>
    </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = cartona;
}

function api(method, data) {
  fetch("https://crud-node-js.vercel.app/products", {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(() => getData()).catch((error)=>console.log(error))
}

function addPost() {
  let data = {
    title: postTitle.value,
    price: postPrice.value,
    description: postDescription.value,
  };

  api("POST", data);

  displayPosts();

  clearInput();
}

function setData(i) {
  globalId = posts[i].id;
  postTitle.value = posts[i].title;
  postPrice.value = posts[i].price;
  postDescription.value = posts[i].description;

  addpostBtn.style.display = "none";
  updatepostBtn.style.display = "block";
}

function updatePost() {
  let data = {
    id: globalId,
    title: postTitle.value,
    price: postPrice.value,
    description: postDescription.value,
  };

  api("PUT", data);

  addpostBtn.style.display = "block";
  updatepostBtn.style.display = "none";

  clearInput();
}

function deletePost(id) {
  let data = { id };

  api("DELETE", data);
}

function clearInput() {
  postTitle.value = "";
  postPrice.value = "";
  postDescription.value = "";
}

function searchPost() {
  let query = searchInput.value.toLowerCase();
  let filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query)
  );
  displayFilteredPosts(filteredPosts);
}

function displayFilteredPosts(filteredPosts) {
  let cartona = ``;

  for (let i = 0; i < filteredPosts.length; i++) {
    cartona += `
        <tr>
        <td>${[i + 1]}</td>
        <td>${filteredPosts[i].title}</td>
        <td>${filteredPosts[i].price}</td>
        <td>${filteredPosts[i].description}</td>
        <td>
            <button class="btn btn-update" onclick="setData(${i})">Update</button>
            <button class="btn btn-delete" onclick="deletePost(${
              filteredPosts[i].id
            })">Delete</button>
        </td>
    </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = cartona;
}
