document.getElementById("error-message").style.display = "none";

const searchPhone = (phone) => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  searchField.value = "";

  if (searchText == "") {
    document.getElementById("error-message").style.display = "block";
    document.getElementById("search-result").innerHTML = "";
    document.getElementById("search-id").innerHTML = "";
    document.getElementById("product-details").innerHTML = "";
  } else if (searchText.length < 7 && searchText.length >= 0) {
    document.getElementById("error-message").style.display = "none";
    document.getElementById("product-details").innerHTML = "";
    document.getElementById("search-id").innerHTML = "";

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.data));
  } else if (searchText.length >= 7) {
    document.getElementById("error-message").style.display = "none";
    document.getElementById("product-details").innerHTML = "";
    document.getElementById("search-id").innerHTML = "";

    const url = `https://openapi.programming-hero.com/api/phone/${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayProductBySearchId(data.data));
  }
};
// display phone in ui with name and brand
const displaySearchResult = (data) => {
  const newArray = data.slice(0, 20);
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";

  newArray.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
            <div class="card" >
               <img src="${product.image}" class="card-img-top shadow py-3 w-50 h-50 mx-auto" alt="...">
               <div class="card-body">
                  <h5 class="card-title">Name: ${product.phone_name}</h5>
                  <p class="card-text">Brand: ${product.brand}</p>
               </div>
               <div class="d-grid justify-content-end p-2">
                  <button onclick="loadProductDetails('${product.slug}')" class="btn btn-info fw-bold" type="button">More Details</button>
               </div>
            </div>
            `;
    searchResult.appendChild(div);
  });
};

const loadProductDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayProductDetails(data.data));
};

const displayProductDetails = (product) => {
  const productDetails = document.getElementById("product-details");
  productDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("row");
  div.innerHTML = `
               <div class="col-md-6 col-12 py-4 d-flex justify-content-center">
                  <img src="${product.image}" class="img-fluid rounded-start" alt="...">
               </div>
               <div class="col-md-6 col-12">
                  <div class="card-body">
                  <h5 class="card-title">Name: ${product.name}</h5>
                  <p id="release-date" class="card-text"><small class="text-muted"> ${product.releaseDate}</small></p>
                  <p class="card-text">Brand: ${product.brand}</p>
                  <p class="card-text">Storage: ${product.mainFeatures.storage}</p>
                  <p class="card-text">Display: ${product.mainFeatures.displaySize}</p>
                  <p class="card-text">Sensors: ${product.mainFeatures.sensors}</p>
                  <p class="card-text">Chipset: ${product.mainFeatures.chipSet}</p>
                  <p class="card-text">Id: ${product.slug}</p>
                  </div>
               </div>
        `;
  productDetails.appendChild(div);

  const releaseDate = document.getElementById("release-date");
  if (releaseDate.innerText == "") {
    releaseDate.innerText = "Released date not found";
  }
};
// display search product by Id
const displayProductBySearchId = (data) => {
  const idResult = document.getElementById("search-id");
  idResult.textContent = "";
  const div = document.createElement("div");
  div.classList.add("row");
  div.innerHTML = `
            <div class="col-md-6 col-12 py-4 d-flex justify-content-center">
               <img src="${data.image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-6 col-12">
               <div class="card-body">
                  <h5 class="card-title">Name: ${data.name}</h5>
                  <p id="release-date2" class="card-text"><small class="text-muted"> ${data.releaseDate}</small></p>
                  <p class="card-text">Sensor: ${data.mainFeatures.sensors}</p>
                  <p class="card-text">Storage: ${data.mainFeatures.storage}</p>
                  <p class="card-text">Display: ${data.mainFeatures.displaySize}</p>
                  <p class="card-text">Wi-fi: ${data.others.WLAN}</p>
                  <p class="card-text">Bluetooth: ${data.others.Bluetooth}</p>
                  <p class="card-text">Gps: ${data.others.GPS}</p>
               </div>
            </div>
          `;

  idResult.appendChild(div);
  const releaseDate2 = document.getElementById("release-date2");
  if (releaseDate2.innerText == "") {
    releaseDate2.innerText = "Released date not found";
  }
};
