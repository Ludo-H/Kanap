// ------------
// VARIABLES
// ------------


//*******************************************************************
// Contenu du LS
let localStorageContains = JSON.parse(localStorage.getItem("basket"));

// Pour afficher ou non le formulaire
let formDiv = document.querySelector(".cart__order");

if(localStorageContains == null || localStorageContains.length == 0){
    formDiv.style.display = "none";
}
//*******************************************************************




//*******************************************************************
// Affichage du cumul de quantité
let totalProducts = document.getElementById("totalQuantity");
totalProducts.textContent = getNumberProduct();

// Affichage du cumul du prix
let totalPrice = document.getElementById("totalPrice");
totalPrice.textContent = getTotalPrice();
//*******************************************************************




//------------
// FONCTIONS
//------------


//*******************************************************************
// Pour afficher le contenu du panier
let section = document.getElementById("cart__items");

// On créé une fonction, on ne veut pas jouer forEach dans le vide
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
        paraQuantity.classList.add("infoQuantity");
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
        divDelete.classList.add("cart__item__content__settings__delete");
        divSettings.appendChild(divDelete);
    
        // Le para supprimer
        let paraDelete = document.createElement("p");
        paraDelete.classList.add("deleteItem");
        paraDelete.setAttribute("id", `${product.id}`);
        paraDelete.setAttribute("data-color", `${product.color}`);
        paraDelete.textContent = "Supprimer";
        divDelete.appendChild(paraDelete);
    });
    };
};
basketDisplay();
//*******************************************************************




//*******************************************************************
// Fonction pour récupérer le total des articles
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
// Fonction pour récupérer le prix total
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


//*******************************************************************
// On récupère les div du boutton supprimer
let paraDelete = document.querySelectorAll(".deleteItem");

// On créé une boucle pour passer sur tous les bouttons
for(let i = 0; i < paraDelete.length; i++){
    // Evenement sur chaque boutton
    paraDelete[i].addEventListener("click", ()=>{
        // On fait un contre filtre pour récupérer ceux qui ne correspondent pas
        localStorageContains = localStorageContains.filter(element => element.id != paraDelete[i].id || element.color != paraDelete[i].dataset.color);

        // On renvoi les données actuelles dans le LS
        localStorage.setItem("basket", JSON.stringify(localStorageContains));

        // On reload la page pour avoir l'affichage à jour (la fonction affiche plusieurs fois le panier, et pas à jour)
        location.reload();
    });
};
//*******************************************************************




//*******************************************************************
// On récupère les input qui gèrent la quantité
let inputQuantity = document.querySelectorAll(".itemQuantity");

// On récupère le para qui affiche la quantité
let paraQuantity = document.querySelectorAll(".infoQuantity");

// On créé une boucle pour passer sur tous les input
for(let i = 0; i < inputQuantity.length; i++){
    // Evenement sur chaque input
    inputQuantity[i].addEventListener("change", ()=>{
        // On change la quantité du produit [i] de la variable qui représente le panier, comme cette quantité permet d'afficher dans le para, le para se met à jour et les totaux plus bas aussi grâce au rafraichissement de la page
        localStorageContains[i].quantity = inputQuantity[i].valueAsNumber;
        
        // On renvoi les données actuelles dans le LS
        localStorage.setItem("basket", JSON.stringify(localStorageContains));

        location.reload();
    });
};
//*******************************************************************