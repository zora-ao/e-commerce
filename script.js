const cartCount = document.getElementById("cart-count");
import products from "./products.js";
import { cart } from "./cart/cart.js";

const showProducts = products.splice(0, 4);
const productsContainer = document.querySelector("#products-container");
showProducts.forEach(product => {
    cartCount.innerHTML = cart.length;
    productsContainer.innerHTML += `
    <div class="md:w-[250px] w-[150px] mx-auto justify-center border border-black shadow-lg rounded">
    <div class="md:h-full overflow-hidden w-[100%] bg-[#B1C29E] flex flex-col items-center md:mb-3">
        <img src="${product.src}" class="md:h-[200px] md:w-[200px] h-[100px] w-[100px] py-5 ease duration-300 hover:scale-125" />
    </div>    
        <div class="flex md:flex-row flex-col text-center justify-evenly w-full my-3">
            <h1>${product.name}</h1>
            <p class="text-pink-600 font-bold">$${product.price}</p>
        </div>
        </div>
    `;
});