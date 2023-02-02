//traigo mi objeto de productos y lo parseo.

let productsInCart = localStorage.getItem("products-in-cart");
productsInCart = JSON.parse(productsInCart);
console.log(productsInCart);
console.log(typeof productsInCart);

//traigo los elementos del DOM

const carProducts = document.querySelector(".car-products");
const actionCart = document.querySelector("#action-car");
let deleteBottom = document.querySelectorAll(".delete-product");
let actionContainer = document.querySelector(".action-container");
let sum = document.querySelector("#sum");
let buyBottom = document.querySelector("#buy-button");

//función para cargar productos en el carrito 

function upladeProductsCart (){
    if(productsInCart !== {}) {
     
    carProducts.classList.remove("disabled");

    carProducts.innerHTML = "";

    productsInCart.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("car-product");
        div.innerHTML = `
        <img class="car-product-image" src="${product.image}" alt="">
                        
        <div class="car-product-select">
            <p class="selected-product">Producto seleccionado</p>
            <h3>${product.id}</h3>
        </div>

        <div class="car-amount">
            <p>Cantidad</p>
            <p>${product.amount}</p>
        </div>

        <div class="car-price">
            <p>Precio</p>
            <p>$${product.price}</p>
        </div>

        <div class="car-price-sub">
            <p>Sub Total</p>
            <p>$${product.price * product.amount}</p>
        </div>

        <button class="delete-product" id="${product.id}">trash</button>
    
        `;
        carProducts.append(div);
        actionContainer.classList.remove("disabled");
    });

    toUpdateDeleteBtn ();
    updateSum ();

}else{
    carProducts.classList.add("disabled");
    actionContainer.classList.add("disabled");
}
}

//Carga todos los productos del localStorage

upladeProductsCart();

function toUpdateDeleteBtn () {
    deleteBotons = document.querySelectorAll(".delete-product");
    deleteBotons.forEach(buton => {
        buton.addEventListener("click",deleteCart);
   
        //Funcion para eliminar la opcion de compra al borrar todos los productos
             
        buton.addEventListener("click", ()=>{
            const PRODUCTS = productsInCart;
            console.log(PRODUCTS);
            if(PRODUCTS.length == 0){
                console.log("Funciona")
                actionContainer.classList.add("disabled")
            }else{
                console.log("No funciona");
            }
        })     
    });
}


function deleteCart (e) {

    const idBtn = e.currentTarget.id;
    const index = productsInCart.findIndex(product => product.id === idBtn)
    productsInCart.splice(index, 1);
    upladeProductsCart();
    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));  

}


function updateSum (){
    let totalSum = productsInCart.reduce((acc, product) => acc + (product.amount * product.price),0);
    sum.innerHTML = `$${totalSum}`;
}


buyBottom.addEventListener("click", buyProducts);
buyBottom.addEventListener("click", thanksForYourPurchase);


function buyProducts(){
    productsInCart.length = 0;
    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
    carProducts.classList.add("disabled");
    actionContainer.classList.add("disabled");
}



function thanksForYourPurchase () {
    Swal.fire(
        'Muchas gracias por tu compra',
      )
  }
 
