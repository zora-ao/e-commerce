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
        <div class="flex flex-col mx-auto md:w-full text-center w-[150px] md:h-auto h-[80px]">
            <h1>${item.name}</h1>
            <p class="text-pink-600 font-bold text-center">$${item.price}</p>
        </div>
        <div class="flex w-full justify-evenly mt-2 bg-[#4B352A] text-[#F0F2BD] py-2">
            <button data-id="${item.id}" class="add-to-cart">Order Now</button>
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
const orderContainer = document.getElementById("order-container");



const removeOrder = () => {
    const removeBtn = document.getElementById('order-close');

    removeBtn.addEventListener('click', () => {
        orderContainer.innerHTML = '';
    });
};

const displayOrder = (order) => {
    
    orderContainer.innerHTML = 
    `<div id="order-container" class="md:w-[300px] w-[250px] md:top-20 top-1/3 md:p-5 p-3 rounded bg-[#F0F2BD] border border-black fixed z-30" >
    <button id="order-close" class="absolute">X</button>
    <h1 id="order-name" class="text-center text-xl md:text-2xl mb-2">${order.name}</h1>
    <img id="order-img" class="w-[150px] h-[150px] mx-auto" src="../${order.src}" loading="lazy" />
    <p class="text-center">Price: <span id="order-price">$${order.price}</span></p>
    <div class="flex gap-x-2 mt-2 justify-center">
        <h2>Quantity:</h2>
        <span id="order-add" class="cursor-pointer">+</span>
        <input id="order-input" value=1 class="rounded w-[60px] border border-black text-center" type="number" />
        <span id="order-sub" class="cursor-pointer">-</span>
    </div>
    <button id="order-btn" class="border w-full py-2 rounded mt-5 bg-[#4B352A] text-white">Add to Cart</button>
    </div>`
    //closing the order
    removeOrder();
    //add and subtracting order
    const incOrder = document.getElementById("order-add");
    const orderInput = document.getElementById("order-input");
    const subOrder = document.getElementById("order-sub");

    let orderCount = Number(orderInput.value);

    incOrder.addEventListener('click', () => {
        orderCount++;
        orderInput.value = orderCount;
    });

    subOrder.addEventListener('click', () => {
        if(orderCount > 1){
            orderCount--;
            orderInput.value = orderCount;
        }
    });
    //add to cart
    const orderBtn = document.getElementById("order-btn");

    orderBtn.addEventListener('click', () => {
        orderCount = Number(orderInput.value);
        orderContainer.innerHTML = '';
        addToCart(order, addNotification, orderCount);
        productCount.innerHTML = cart.length;
    });
}



allProductsCon.addEventListener('click', (e) => {
    const btn = e.target.closest(".add-to-cart"); 
    if(btn){
        const id = parseInt(btn.getAttribute("data-id"));
        const findProduct = products.find((product) => product.id === id);
        displayOrder(findProduct);
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

//For changing navigation background per sections


const sections = [
    {id: "new-main-container", button: "new-observe"},
    {id: "specialty-main-container", button: "special-observe"},
    {id: "best-main-container", button: "best-observe"},
    {id: "cupcakes-main-container", button: "cupcakes-observe"}
];

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const findSection = sections.find((e) => e.id === entry.target.id);
        const btn = document.getElementById(findSection.button);
        if(entry.isIntersecting){
            btn.classList.add("text-[#4B352A]", "bg-white", "font-bold");
        } else {
            btn.classList.remove("text-[#4B352A]", "bg-white", "font-bold");
        }
    })
},
    {
        threshold: 0.4
    }
);

sections.forEach((section) => {
    const el = document.getElementById(section.id);
    if(el) observer.observe(el)
});


