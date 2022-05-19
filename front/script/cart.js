// ------------
// VARIABLES
// ------------


//*******************************************************************
// Pour afficher ou non le formulaire
let formDiv = document.querySelector(".cart__order");
let localStorageContains = JSON.parse(localStorage.getItem("basket"));
console.log(localStorageContains);


if(localStorageContains == null || localStorageContains.length == 0){
    formDiv.style.display = "none";
}
//*******************************************************************



//*******************************************************************
// Pour afficher le contenu du panier
let section = document.getElementById("cart__items");

// On ne veut pas jouer forEach dans le vide
function basketDisplay() {
    if(localStorageContains != null){
        localStorageContains.forEach(product => {
        // Article qui contient tout
        let article = document.createElement("article");
        article.classList.add("cart__item");
        article.setAttribute("data-id", `${product.id}`);
        article.setAttribute("data-color", `${product.color}`);
        section.appendChild(article);
    
        // La div et son image
        let divImg = document.createElement("div");
        divImg.classList.add("cart__item__img");
        article.appendChild(divImg);
        let img = document.createElement("img");
        img.setAttribute("src", `${product.dataProduct.imageUrl}`);
        img.setAttribute("alt", `${product.dataProduct.altTxt}`);
        divImg.appendChild(img);
    
        // La div qui contient tous les renseignements
        let divAllTxt = document.createElement("div");
        divAllTxt.classList.add("cart__item__content");
        article.appendChild(divAllTxt);
    
        // La div qui contient nom, couleur, prix
        let divDescription = document.createElement("div");
        divDescription.classList.add("cart__item__content__description");
        divAllTxt.appendChild(divDescription);
    
        // Nom du produit
        let nameProduct = document.createElement("h2");
        nameProduct.textContent = `${product.dataProduct.name}`;
        divDescription.appendChild(nameProduct);
    
        // Couleur du produit
        let colorProduct = document.createElement("p");
        colorProduct.textContent = `${product.color}`;
        divDescription.appendChild(colorProduct);
    
        // Prix du produit
        let priceProduct = document.createElement("p");
        priceProduct.textContent = `${product.dataProduct.price * product.quantity} €`;
        divDescription.appendChild(priceProduct);
    
        // La div qui contient bouttons et input
        let divSettings = document.createElement("div");
        divSettings.classList.add("cart__item__content__settings");
        divAllTxt.appendChild(divSettings);
    
        // La div qui contient input quantité
        let divQuantity = document.createElement("div");
        divQuantity.classList.add("cart__item__content__settings__quantity");
        divSettings.appendChild(divQuantity);
    
        // Info de la quantité
        let paraQuantity = document.createElement("p");
        paraQuantity.textContent = `Qté : ${product.quantity}`;
        divQuantity.appendChild(paraQuantity);
    
        // Input de la quantité
        let inputQuantity = document.createElement("input");
        inputQuantity.setAttribute("type", "number");
        inputQuantity.setAttribute("name", "itemQuantity");
        inputQuantity.setAttribute("min", "1");
        inputQuantity.setAttribute("max", "100");
        inputQuantity.setAttribute("value", `${product.quantity}`);
        inputQuantity.classList.add("itemQuantity");
        divQuantity.appendChild(inputQuantity);
    
        // La div du boutton supprimer
        let divDelete = document.createElement("div");
        divDelete.setAttribute("id", `${product.id}`);
        divDelete.setAttribute("data-color", `${product.color}`);
        divDelete.classList.add("cart__item__content__settings__delete");
        divSettings.appendChild(divDelete);
    
        // Le para supprimer
        let paraDelete = document.createElement("p");
        paraDelete.classList.add("deleteItem");
        paraDelete.textContent = "Supprimer";
        divDelete.appendChild(paraDelete);
    });
    };
};
basketDisplay();
//*******************************************************************




//*******************************************************************
let totalProducts = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");

totalProducts.textContent = getNumberProduct();
totalPrice.textContent = getTotalPrice();
//*******************************************************************




//------------
// FONCTIONS
//------------


//*******************************************************************
function getNumberProduct() {
    if(localStorageContains != null){
    let number = 0;
    for (let product of localStorageContains){
        number += product.quantity;
    }
    return number;
}
}
//*******************************************************************




//*******************************************************************
function getTotalPrice() {
    if(localStorageContains != null){
    let total = 0;
    for (let product of localStorageContains){
        total += (product.dataProduct.price * product.quantity);
    }
    return total;
}
}
//*******************************************************************




//------------
// EVENEMENTS
//------------
let divDelete = document.querySelectorAll(".cart__item__content__settings__delete");
console.log(divDelete);

for(let i = 0; i < divDelete.length; i++){
    divDelete[i].addEventListener("click", ()=>{
        console.log(divDelete[i].dataset.color);
        localStorageContains = localStorageContains.filter(element => element.id != divDelete[i].id || element.color != divDelete[i].dataset.color);
        console.log(localStorageContains);
        localStorage.setItem("basket", JSON.stringify(localStorageContains));
        location.reload();
    });
    
};


// for (let i = 0; i < localStorageContains.length; i++){

// }

// divDelete.forEach(button => {
//     button.addEventListener("click", ()=>{
//         localStorage.removeItem(button.id)
//     });
// });


// function removeItemOfLS(button) {
//     localStorageContains = localStorageContains.filter(product => product.id =! button.id);
// }












// // Pour afficher ou non le formulaire
// let formDiv = document.querySelector(".cart__order");

// // Envoyer du contenu dans le LS
// function saveBasket(basket) {
//     localStorage.setItem("basket", JSON.stringify(basket));
// }

// // Récupérer le contenu du LS
// function getBasket() {
//     let basket = localStorage.getItem("basket");
//     if(basket == null){
//         return [];
//     }else{
//         return JSON.parse(basket)
//     }
// }

// // Permet de retirer le produit voulu (en parametre)
// function removeFromBasket(product) {
//     let basket = getBasket();
//     basket = basket.filter(basketProduct => basketProduct.id != product.id);
//     saveBasket(basket);
// }

// // Pour afficher le contenu du panier
// let section = document.getElementById("cart__items");

// // On ne veut pas jouer forEach dans le vide
// function basketDisplay() {
//         let basket = getBasket();
//         basket.forEach(product => {
//         // Article qui contient tout
//         let article = document.createElement("article");
//         article.classList.add("cart__item");
//         article.setAttribute("data-id", `${product.id}`);
//         article.setAttribute("data-color", `${product.color}`);
//         section.appendChild(article);
    
//         // La div et son image
//         let divImg = document.createElement("div");
//         divImg.classList.add("cart__item__img");
//         article.appendChild(divImg);
//         let img = document.createElement("img");
//         img.setAttribute("src", `${product.dataProduct.imageUrl}`);
//         img.setAttribute("alt", `${product.dataProduct.altTxt}`);
//         divImg.appendChild(img);
    
//         // La div qui contient tous les renseignements
//         let divAllTxt = document.createElement("div");
//         divAllTxt.classList.add("cart__item__content");
//         article.appendChild(divAllTxt);
    
//         // La div qui contient nom, couleur, prix
//         let divDescription = document.createElement("div");
//         divDescription.classList.add("cart__item__content__description");
//         divAllTxt.appendChild(divDescription);
    
//         // Nom du produit
//         let nameProduct = document.createElement("h2");
//         nameProduct.textContent = `${product.dataProduct.name}`;
//         divDescription.appendChild(nameProduct);
    
//         // Couleur du produit
//         let colorProduct = document.createElement("p");
//         colorProduct.textContent = `${product.color}`;
//         divDescription.appendChild(colorProduct);
    
//         // Prix du produit
//         let priceProduct = document.createElement("p");
//         priceProduct.textContent = `${product.dataProduct.price * product.quantity} €`;
//         divDescription.appendChild(priceProduct);
    
//         // La div qui contient bouttons et input
//         let divSettings = document.createElement("div");
//         divSettings.classList.add("cart__item__content__settings");
//         divAllTxt.appendChild(divSettings);
    
//         // La div qui contient input quantité
//         let divQuantity = document.createElement("div");
//         divQuantity.classList.add("cart__item__content__settings__quantity");
//         divSettings.appendChild(divQuantity);
    
//         // Info de la quantité
//         let paraQuantity = document.createElement("p");
//         paraQuantity.textContent = `Qté : ${product.quantity}`;
//         divQuantity.appendChild(paraQuantity);
    
//         // Input de la quantité
//         let inputQuantity = document.createElement("input");
//         inputQuantity.setAttribute("type", "number");
//         inputQuantity.setAttribute("name", "itemQuantity");
//         inputQuantity.setAttribute("min", "1");
//         inputQuantity.setAttribute("max", "100");
//         inputQuantity.setAttribute("value", `${product.quantity}`);
//         inputQuantity.classList.add("itemQuantity");
//         divQuantity.appendChild(inputQuantity);
    
//         // La div du boutton supprimer
//         let divDelete = document.createElement("div");
//         divDelete.classList.add("cart__item__content__settings__delete");
//         divSettings.appendChild(divDelete);
    
//         // Le para supprimer
//         let paraDelete = document.createElement("p");
//         paraDelete.classList.add("deleteItem");
//         paraDelete.setAttribute("id", `${product.id}`);
//         paraDelete.setAttribute("data-color", `${product.color}`);
//         paraDelete.textContent = "Supprimer";
//         divDelete.appendChild(paraDelete);
//     });
//     };
// basketDisplay();

// let totalProducts = document.getElementById("totalQuantity");
// let totalPrice = document.getElementById("totalPrice");

// totalProducts.textContent = getNumberProduct();
// totalPrice.textContent = getTotalPrice();

// function getNumberProduct() {
//     let basket = getBasket();
//     let number = 0;
//     for (let product of basket){
//         number += product.quantity;
//     }
//     return number;
// }

// function getTotalPrice() {
//     let basket = getBasket();
//     let total = 0;
//     for (let product of basket){
//         total += (product.dataProduct.price * product.quantity);
//     }
//     return total;
// }

// let deleteItem = document.querySelectorAll(".deleteItem");
// console.log(deleteItem);