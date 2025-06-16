import products from "../products.js";
import { addToCart } from "../cart/cart.js";
import { cart } from "../cart/cart.js";
const productCount = document.getElementById("product-count");

productCount.innerHTML = cart.length;
export const displayProducts = (containerId, category) => {
    const container = document.getElementById(`${containerId}`);
    const filterProducts = products.filter((product) => product.category === category);
    filterProducts.forEach((item) => {
        container.innerHTML += `<div class="group md:w-[200px] border border-black rounded">
        <div class="bg-[#B1C29E] md:h-[150px] h-[150px] w-full md:w-full overflow-hidden shadow-lg flex flex-col items-center mb-3">
            <img class="md:w-[130px] md:h-[130px] w-[150px] h-[120px] my-auto group-hover:scale-125 ease duration-300" src="../${item.src}" alt="">
        </div>
        <div class="flex flex-col text-center justify-evenly w-[150px] md:h-auto h-[80px]">
            <h1>${item.name}</h1>
            <p class="text-pink-600 font-bold">$${item.price}</p>
        </div>
        <div class="flex w-full justify-evenly mt-2 bg-[#4B352A] text-[#F0F2BD] py-2">
            <button>Buy Now</button>
            <button data-id="${item.id}" class="add-to-cart"><i class="fa-solid fa-cart-shopping"></i></button>
        </div>
        </div>`
});
};

displayProducts("new-container", "new");
displayProducts("specialty-container", "specialty");
displayProducts("best-container", "best");
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
const closeBtn = document.getElementById("close-btn");
menuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle("translate-x-full");
});
closeBtn.addEventListener('click', () => {
    mobileNav.classList.toggle("translate-x-full");
});
document.addEventListener('click', (event) => {
    if (!mobileNav.contains(event.target) && !menuBtn.contains(event.target)) {
        mobileNav.classList.add("translate-x-full");
    }
});