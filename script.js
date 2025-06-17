const cartCount = document.getElementById("product-count");
import products from "./products.js";
import { cart } from "./cart/cart.js";

const filterNewProducts = products.filter(product => product.category === "best");
const productsContainer = document.querySelector("#products-container");
filterNewProducts.forEach(product => {
    cartCount.innerHTML = cart.length;
    productsContainer.innerHTML += `
    <div class="opacity-0 translate-y-10 transition-all duration-700 box md:w-[250px] w-[170px] mx-auto justify-center border border-black shadow-lg rounded group">
    <div class="md:h-full overflow-hidden w-full h-full bg-[#B1C29E] flex flex-col items-center md:mb-3">
        <img src="${product.src}" class="md:h-[200px] md:w-[200px] h-[150px] w-[100px] py-5 ease duration-300 group-hover:scale-125" />
    </div>    
        <div class="flex md:flex-row flex-col text-center justify-evenly md:h-full h-[100px] w-full my-3">
            <h1>${product.name}</h1>
            <p class="text-pink-600 font-bold">$${product.price}</p>
        </div>
        <button class="text-center bg-[#4B352A] text-white py-2 w-full"><a href="./menu/menu.html">Order Now</a></button>
    </div>
    `;
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

//Observer animation

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        console.log(entry.target)
        if(entry.isIntersecting){
            console.log(entry.isIntersecting)
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        } else {
            entry.target.classList.remove('opacity-100', 'translate-y-0');
            entry.target.classList.add('opacity-0', 'translate-y-10');
        }
    })
}
)

document.querySelectorAll(".box").forEach(e => {
    observer.observe(e)
})