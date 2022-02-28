// search#search-field
// button{onclick="searchPhone"}
// div#product-details
// div#search-result

const searchPhone = (phone) => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);

  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.data));
};
// display phone in ui with name and brand
const displaySearchResult = (data) => {
  //   console.log(data);
  const searchResult = document.getElementById("search-result");
  data.forEach((product) => {
    console.log(product);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
            <div class="card">
               <img src="${product.image}" class="card-img-top py-3 w-75 h-50 mx-auto" alt="...">
               <div class="card-body">
                  <h5 class="card-title">Name: ${product.phone_name}</h5>
                  <p class="card-text">Brand: ${product.brand}</p>
               </div>
            </div>
            `;
    searchResult.appendChild(div);
  });
};
