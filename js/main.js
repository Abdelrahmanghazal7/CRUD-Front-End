let productName = document.getElementById("name");
let productPrice = document.getElementById("price");
let productDescription = document.getElementById("description");
let addProductBtn = document.getElementById("add");
let updateProductBtn = document.getElementById("update");
let searchInput = document.getElementById("searchInput");
let totalProducts = document.getElementById("total");

let products = [];
let globalId = "";

function getData() {
  fetch("https://crud-node-js.vercel.app/products")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      displayproducts();
      totalProducts.innerHTML = products.length;
    });
}
getData();

function displayproducts() {
  let cartona = ``;

  for (let i = 0; i < products.length; i++) {
    cartona += `
        <tr>
        <td>${[i + 1]}</td>
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].description}</td>
        <td class="actions">
            <button class="btn btn-update" onclick="setData(${i})">Update</button>
            <button class="btn btn-delete" onclick="deletePost(${
              products[i].id
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
    .then(() => getData())
    .catch((error) => console.log(error));
}

function addPost() {
  let data = {
    name: productName.value,
    price: productPrice.value,
    description: productDescription.value,
  };

  api("POST", data);

  displayproducts();

  clearInput();
}

function setData(i) {
  globalId = products[i].id;
  productName.value = products[i].name;
  productPrice.value = products[i].price;
  productDescription.value = products[i].description;

  addProductBtn.style.display = "none";
  updateProductBtn.style.display = "block";
}

function updatePost() {
  let data = {
    id: globalId,
    name: productName.value,
    price: productPrice.value,
    description: productDescription.value,
  };

  api("PUT", data);

  addProductBtn.style.display = "block";
  updateProductBtn.style.display = "none";

  clearInput();
}

function deletePost(id) {
  let data = { id };

  api("DELETE", data);
}

function clearInput() {
  productName.value = "";
  productPrice.value = "";
  productDescription.value = "";
}

function searchPost() {
  let query = searchInput.value.toLowerCase();
  let filteredproducts = products.filter((post) =>
    post.name.toLowerCase().includes(query)
  );
  displayFilteredproducts(filteredproducts);
}

function displayFilteredproducts(filteredproducts) {
  let cartona = ``;

  for (let i = 0; i < filteredproducts.length; i++) {
    cartona += `
        <tr>
        <td>${[i + 1]}</td>
        <td>${filteredproducts[i].name}</td>
        <td>${filteredproducts[i].price}</td>
        <td>${filteredproducts[i].description}</td>
        <td>
            <button class="btn btn-update" onclick="setData(${i})">Update</button>
            <button class="btn btn-delete" onclick="deletePost(${
              filteredproducts[i].id
            })">Delete</button>
        </td>
    </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = cartona;
}
