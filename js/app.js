document.getElementById("error-message").style.display = "none";
// handle search button and fetch url
const searchPhone = (phone) => {
  const productDetails = document.getElementById("product-details");
  const searchResult = document.getElementById("search-result");
  searchResult.innerText = "";
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  searchField.value = "";
  document.getElementById("error-message").style.display = "none";

  if (searchText == "") {
    searchResult.innerText = "";
    productDetails.innerText = "";
    document.getElementById("search-id").innerText = "";
    document.getElementById("error-message").style.display = "block";
  } else if (searchText.length < 20) {
    // handle search product by name
    productDetails.innerText = "";
    document.getElementById("search-id").innerText = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == true) {
          displaySearchResult(data.data);
        } else {
          throw new Error("invalid data");
        }
      })
      .catch((error) => displayError(error));
  } else {
    //  handle search product use id
    document.getElementById("search-id").innerText = "";
    productDetails.innerText = "";
    const url = `https://openapi.programming-hero.com/api/phone/${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == true) {
          displayProductBySearchId(data.data);
        }
      });
  }
};

// error function
const displayError = (error) => {
  document.getElementById("error-message").style.display = "block";
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
                  <p id="release-date" class="card-text"><small class="text-muted">Release Date: ${product.releaseDate}</small></p>
                  <p class="card-text">Brand: ${product.brand}</p>
                  <p class="card-text">Id: ${product.slug}</p>
                  <p class="card-text">Storage: ${product.mainFeatures.storage}</p>
                  <p class="card-text">Display: ${product.mainFeatures.displaySize}</p>
                  <p class="card-text">Sensors: ${product.mainFeatures.sensors}</p>
                  <p class="card-text">Chipset: ${product.mainFeatures.chipSet}</p>
                <div id="set-others-new">
                  <p id="others-info-new" class="card-text">Bluetooth: ${product?.others?.Bluetooth}</p>
                  <p class="card-text">WLAN: ${product?.others?.WLAN}</p>
                  <p class="card-text">GPS: ${product?.others?.GPS}</p>
                </div>
              </div>
            </div>
        `;
  productDetails.appendChild(div);

  const releaseDate = document.getElementById("release-date");
  if (releaseDate.innerText == "Release Date:") {
    releaseDate.innerText = `Release Date: Released date not found !`;
  }
  // others info handling
  const othersDetailsNew = document.getElementById("others-info-new");
  const setOthersNew = document.getElementById("set-others-new");
  if (othersDetailsNew.innerText == "Bluetooth: undefined") {
    setOthersNew.innerText = `Others: Others information not found`;
  }
};
// display search product by Id
const displayProductBySearchId = (data) => {
  const idResult = document.getElementById("search-id");
  document.getElementById("error-message").style.display = "none";
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
                  <p id="release-date-new" class="card-text"><small  class="text-muted">Release Date: ${data.releaseDate}</small></p>
                  <p class="card-text">Brand: ${data.brand}</p>
                  <p class="card-text">Id: ${data.slug}</p>
                  <p class="card-text">Display: ${data.mainFeatures.displaySize}</p>
                  <p class="card-text">Storage: ${data.mainFeatures.storage}</p>
                  <p class="card-text">Sensor: ${data.mainFeatures.sensors}</p>
                  <p class="card-text">Chipset: ${data.mainFeatures.chipSet}</p>
                <div id="set-others">
                  <p class="card-text">Bluetooth: ${data?.others?.Bluetooth}</p>
                  <p class="card-text">WLAN: ${data?.others?.WLAN}</p>
                  <p class="card-text">GPS: ${data?.others?.GPS}</p>
                </div>
                  
              </div>
            </div>
         `;
  idResult.appendChild(div);
  const releaseDateNew = document.getElementById("release-date-new");
  if (releaseDateNew.innerText == "Release Date:") {
    releaseDateNew.innerText = `Release Date: Released date not found !`;
  }
  // others info handling
  const othersDetails = document.getElementById("others-info");
  const setOthers = document.getElementById("set-others");
  if (othersDetails.innerText == "Bluetooth: undefined") {
    setOthers.innerText = `Others: Others information not found`;
  }
};
// ==============all done==================
