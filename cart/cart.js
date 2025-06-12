const ordersContainer = document.getElementById("orders");
const totalItems = document.getElementById("cart-total-items");
const subTotal = document.getElementById("sub-total");
const shipping = document.getElementById("shipping");
const tax = document.getElementById("tax");
const discount = document.getElementById("discount");
const totalCost = document.getElementById("total-cost");
export let cart = JSON.parse(localStorage.getItem("products")) || [];

if (!Array.isArray(cart)) cart = [];

export const addToCart = (item, notification) => {
    const find = cart.find((i) => i.id === item.id);
    if(find){
        find.quantity += 1;
        notification.innerHTML = `<i class="fa-solid fa-check"></i> Item already in cart. Quantity increased.`;
    } else {
        cart.push({...item, quantity: 1});
        notification.innerHTML = `<i class="fa-solid fa-check"></i> Item added to cart.`;
    }
    notification.classList.remove("hidden");
    setTimeout(() => {
        notification.classList.add("hidden");
    }, 1000);
    localStorage.setItem("products", JSON.stringify(cart));
};

export const displayCartItems = () => {
    if(!ordersContainer) return;
    if(cart.length === 0){
        ordersContainer.innerHTML = `<h1 class="text-3xl my-20 text-center">Your cart is empty.</h1>`;
        return;
    }

    ordersContainer.innerHTML = '';
    cart.forEach((product) => {
        totalItems.innerHTML = `${cart.length} Items`;
        ordersContainer.innerHTML += 
        `<div class="flex justify-around items-center">
            <div class="flex items-center w-[300px]">
                <img class="w-[100px] h-[120px]" src="/${product.src}" alt="${product.name}">
                <div class="mx-2">
                    <h1 class="text-xl">${product.name}</h1>
                    <p>Price: $${product.price}</p>
                    <button data-id="${product.id}" class="delete-btn font-6xl">Remove</button>
                </div>
            </div>
            <div class="flex justify-center gap-x-2 my-2">
                <button data-id="${product.id}" class="increase-btn"><i class="fa-solid fa-plus"></i></button>
                <input class="w-[30px] rounded text-center text-black" type="any" value="${product.quantity || 1}">
                <button data-id="${product.id}" class="decrease-btn"><i class="fa-solid fa-minus"></i></button>
            </div>
            <p>$599</p>
            <p>$${product.price * product.quantity}</p>
        </div>`;
        updateOrderSummary();
    });

    const increaseBtn = document.querySelectorAll(".increase-btn");
    increaseBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            const getId = parseInt(btn.getAttribute("data-id"));
            increase(getId);
        });
    });

    const decreaseBtn = document.querySelectorAll(".decrease-btn");
    decreaseBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            const getId = parseInt(btn.getAttribute("data-id"));
            decrease(getId)
        });
    });

    const deleteBtn = document.querySelectorAll(".delete-btn");
    deleteBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            const getId = parseInt(btn.getAttribute("data-id"));
            deleteItem(getId);
        })
    })
};

const increase = (id) => {
    const findProduct = cart.find((pro) => pro.id === id);
    if(findProduct){
        findProduct.quantity++;
        localStorage.setItem("products", JSON.stringify(cart));
        displayCartItems();
    };
};

const decrease = (id) => {
    const findProduct = cart.find((pro) => pro.id === id);
    if(findProduct.quantity > 1){
        findProduct.quantity--;
        localStorage.setItem("products", JSON.stringify(cart));
        displayCartItems();
    };
};

const deleteItem = (id) => {
    cart = cart.filter((item) => item.id !== id);
    localStorage.setItem("products", JSON.stringify(cart));
    totalItems.innerHTML = `${cart.length} Items`;
    displayCartItems();
    console.log("working")
};

let taxAmount = 0.10; 
let shippingCost = 5;


const updateOrderSummary = () => {
    subTotal.innerHTML = `$${cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}`
}


displayCartItems();
