import products from "../products.js";
import { addToCart } from "../cart/cart.js";
import { cart } from "../cart/cart.js";
const productCount = document.getElementById("product-count");

productCount.innerHTML = cart.length;
export const displayProducts = (containerId, category) => {
    const container = document.getElementById(`${containerId}`);
    const filterProducts = products.filter((product) => product.category === category);
    filterProducts.forEach((item) => {
        container.innerHTML += `<div class="group">
        <div class="bg-[#B2CD9C] md:h-[150px] h-[100px] md:w-[180px] overflow-hidden shadow-lg flex flex-col items-center rounded mb-3">
            <img class="md:w-[130px] md:h-[130px] w-[100px] h-[100px] my-auto group-hover:scale-125 ease duration-300" src="../${item.src}" alt="">
        </div>
        <div class="flex justify-evenly w-full">
            <h1>Chocolate Cake</h1>
            <p class="text-pink-600 font-bold">$599</p>
        </div>
        <div class="flex w-full justify-evenly mt-2 bg-[#CA7842] rounded text-[#F0F2BD] py-2">
            <button>Buy Now</button>
            <button data-id="${item.id}" class="add-to-cart"><i class="fa-solid fa-cart-shopping"></i></button>
        </div>
        </div>`
});
};

displayProducts("new-container", "new");
displayProducts("specialty-container", "specialty");
displayProducts("cupcakes-container", "cupcake");

const allProductsCon = document.getElementById("all-products-container");
const addNotification = document.getElementById("add-notif");
allProductsCon.addEventListener('click', (e) => {
    const btn = e.target.closest(".add-to-cart"); 
    if(btn){
        const id = parseInt(btn.getAttribute("data-id"));
        const findProduct = products.find((product) => product.id === id);
        addToCart(findProduct, addNotification);
        productCount.innerHTML = cart.length;
    };
});

const menuBtn = document.getElementById("menu-btn");
const mobileNav = document.getElementById("mobile-nav");
menuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle("-translate-x-full");
    menuBtn.innerHTML = mobileNav.classList.contains("-translate-x-full") ? `<i class="fa-solid fa-bars"></i>` : `<i class="fa-solid fa-xmark"></i>`;
});
