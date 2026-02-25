// data
const products = [
  {
    name: "Sony Playstation 5",
    url: "images/playstation_5.png",
    category: "games",
    price: 499.99,
  },
  {
    name: "Samsung Galaxy",
    url: "images/samsung_galaxy.png",
    category: "smartphones",
    price: 399.99,
  },
  {
    name: "Cannon EOS Camera",
    url: "images/cannon_eos_camera.png",
    category: "cameras",
    price: 749.99,
  },
  {
    name: "Sony A7 Camera",
    url: "images/sony_a7_camera.png",
    category: "cameras",
    price: 1999.99,
  },
  {
    name: "LG TV",
    url: "images/lg_tv.png",
    category: "televisions",
    price: 799.99,
  },
  {
    name: "Nintendo Switch",
    url: "images/nintendo_switch.png",
    category: "games",
    price: 299.99,
  },
  {
    name: "Xbox Series X",
    url: "images/xbox_series_x.png",
    category: "games",
    price: 499.99,
  },
  {
    name: "Samsung TV",
    url: "images/samsung_tv.png",
    category: "televisions",
    price: 1099.99,
  },
  {
    name: "Google Pixel",
    url: "images/google_pixel.png",
    category: "smartphones",
    price: 499.99,
  },
  {
    name: "Sony ZV1F Camera",
    url: "images/sony_zv1f_camera.png",
    category: "cameras",
    price: 799.99,
  },
  {
    name: "Toshiba TV",
    url: "images/toshiba_tv.png",
    category: "televisions",
    price: 499.99,
  },
  {
    name: "iPhone 14",
    url: "images/iphone_14.png",
    category: "smartphones",
    price: 999.99,
  },
];

// DOM variables
const productWrapper = document.getElementById("products-wrapper");
const checkBoxes = document.querySelectorAll(".check");
const filterContainer = document.getElementById("filters-container");
const searchInput = document.getElementById("search");
const cartCount = document.getElementById("cartCount");

// Init cart item count
let cartItemCount = 0;

// Init product element array
const productEls = [];

// Event Listeners for filtering
filterContainer.addEventListener("change", filterProduct);
searchInput.addEventListener("input", filterProduct);

// looping over products from mock data and create an element
products.forEach((product) => {
  const productEl = createProductElement(product);
  productWrapper.appendChild(productEl);

  // push to product array
  productEls.push(productEl);
});

// function to create productElemet
function createProductElement(product) {
  const productEl = document.createElement("div");
  productEl.className = "item space-y-2";
  productEl.innerHTML = `          <div
            class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl"
          >
            <img
              src=${product.url}
              alt=${product.name}
              class="w-full f-full object-cover"
            />
            <button
              class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 transition translate-y-full group-hover:translate-y-0 cursor-pointer"
            >
              Add To Cart
            </button>
          </div>
          <p class="text-xl">${product.name}</p>
          <strong>$${product.price.toLocaleString()}</strong>`;

  productEl.querySelector(".status").addEventListener("click", updateCartCount);

  return productEl;
}

// function to updateCartCount
function updateCartCount(e) {
  const statusEl = e.target;

  if (statusEl.classList.contains("added")) {
    // Remove from cart
    statusEl.classList.remove("added");
    statusEl.innerText = "Add To Cart";
    statusEl.classList.remove("bg-red-600");
    statusEl.classList.add("bg-gray-800");

    cartItemCount--;
  } else {
    // Add to cart
    statusEl.classList.add("added");
    statusEl.innerText = "Remove From Cart";
    statusEl.classList.remove("bg-gray-800");
    statusEl.classList.add("bg-red-600");

    cartItemCount++;
  }

  // Update cart item count
  cartCount.innerText = cartItemCount.toString();
}

// filter Products by checkbox searchInput
function filterProduct() {
  // Get the search term by user
  const searchTerm = searchInput.value.trim().toLowerCase();
  // Get checked categories
  const checkedCategories = Array.from(checkBoxes)
    .filter((check) => check.checked)
    .map((check) => check.id);

  // loop over products and check for matches
  productEls.forEach((prod, index) => {
    const product = products[index];

    // check to see if the product matches search or checked categories
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
    const isInChecked =
      checkedCategories.length === 0 ||
      checkedCategories.includes(product.category);

    // show or hide product based on matches
    if (matchesSearchTerm && isInChecked) {
      prod.classList.remove("hidden");
    } else {
      prod.classList.add("hidden");
    }
  });
}
