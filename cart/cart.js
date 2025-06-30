const ordersContainer = document.getElementById("orders");
const totalItems = document.getElementById("cart-total-items");
const subTotal = document.getElementById("sub-total");
const shipping = document.getElementById("shipping");
const tax = document.getElementById("tax");
const discount = document.getElementById("discount");
const totalCost = document.getElementById("total-cost");
const mobileSubTotal = document.getElementById("mobile-sub-total");
export let cart = JSON.parse(localStorage.getItem("products")) || [];


if (!Array.isArray(cart)) cart = [];

export const addToCart = (item, notification, orderCount) => {
    
    const find = cart.find((i) => i.id === item.id);
    if(find){
        find.quantity += orderCount;
        localStorage.setItem("products", JSON.stringify(cart));
        notification.innerHTML = `<h1 class="bg-[#CA7842] rounded-lg w-full text-center my-2 py-5"><i class="fa-solid fa-check px-5"></i> Item already in cart. Quantity increased.</h1>`;
    } else {
        cart.push({...item, quantity: orderCount});
        localStorage.setItem("products", JSON.stringify(cart));
        notification.innerHTML = `<h1 class="bg-[#CA7842] rounded-lg w-full text-center my-2 py-5"><i class="fa-solid fa-check px-5"></i> Item added to cart.</h1>`;
    }
    setTimeout(() => {
        notification.innerHTML = '';
    }, 1000);
};

export const displayCartItems = () => {
    if(!ordersContainer) return;
    if(cart.length === 0){
        ordersContainer.innerHTML = `<h1 class="md:text-3xl my-20 text-center">Your cart is empty.</h1>`;
        return;
    }

    ordersContainer.innerHTML = '';
    cart.forEach((product) => {
        totalItems.innerHTML = `${cart.length} Items`;
        ordersContainer.innerHTML += 
        `<div class="flex md:justify-around justify-between px-2 items-center my-5">
            <div class="flex md:flex-row items-center md:w-[300px]">
                <img class="md:w-[100px] border border-black w-[50px] h-[50px] md:h-[120px]" src="../${product.src}" alt="${product.name}">
                <div class="mx-2">
                    <h1 class="md:text-xl text-lg">${product.name}</h1>
                    <p>Price: $${product.price}</p>
                    <button data-id="${product.id}" class="delete-btn text-sm">Remove</button>
                </div>
            </div>
            <div class="flex justify-between md:flex-row flex-col md:w-[300px] items-center">
                <div class="flex justify-center gap-x-2 my-2">
                    <button data-id="${product.id}" class="increase-btn"><i class="fa-solid fa-plus"></i></button>
                    <input class="w-[30px] rounded text-center text-black" type="any" value="${product.quantity || 1}">
                    <button data-id="${product.id}" class="decrease-btn"><i class="fa-solid fa-minus"></i></button>
                </div>
                <p class="text-sm"><span class="md:hidden">Total:</span> $${product.price * product.quantity}</p>
            </div>
        </div>`;

    const mobileCheckoutBtn = document.getElementById("mobile-checkout");
    const mobileCheckoutAll = document.getElementById("mobile-checkout-all");
    const mobilePaymentBackBtn = document.getElementById("mobile-payment-back");
    const mobilePayment = document.getElementById("mobile-payment-view");

    mobilePaymentBackBtn.addEventListener('click', () => {
        mobilePayment.classList.add("hidden");
        mobileCheckoutAll.classList.remove("hidden");
    });

    mobileCheckoutBtn.addEventListener('click', () => {
        mobilePayment.classList.remove("hidden");
        mobileCheckoutAll.classList.add("hidden");
    });
    
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
    updateOrderSummary();
    console.log("working")
};

const updateOrderSummary = () => {
    let calculateSubTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let shippingCost = 5;
    let taxAmount = 0.08; 
    let discountAmount = 0.10;

    const calculateDiscount = calculateSubTotal * discountAmount;
    const discountTotal = calculateSubTotal - calculateDiscount;
    const totalTax = discountTotal * taxAmount;
    const totalAmount = discountTotal + totalTax + shippingCost;


    mobileSubTotal.innerHTML = cart.length !== 0 ? `$${calculateSubTotal.toFixed(2)}` : `$0.00`;
    subTotal.innerHTML = cart.length !== 0 ? `${calculateSubTotal.toFixed(2)}` : `$0.00`;
    shipping.innerHTML = `$${shippingCost}`;
    tax.innerHTML = `${Math.floor(taxAmount * 100)}%`;
    discount.innerHTML = `${Math.floor(discountAmount * 100)}%`;
    totalCost.innerHTML = cart.length !== 0 ? totalAmount.toFixed(2) : `$0.00`;
};

displayCartItems();
