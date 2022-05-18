//-------------
// VARIABLES
//-------------

// Variables dans lesquelles on va ajouter du contenu
const sectionItems  = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice    = document.getElementById("totalPrice");
const cartOrder     = document.querySelector(".cart__order");
const inputQuantity = document.querySelectorAll(".itemQuantity");

// On récupère le contenu du panier avec la clé "produit" et on le stocke dans cette variable
let addProduct = JSON.parse(localStorage.getItem("product"));
console.log(addProduct);


//-------------
// FONCTIONS
//-------------

// Fonction pour afficher le contenu du panier
async function cartDisplay() {

    // si addproduct a du contenu, alors on l'attend 
    if(addProduct){
        await addProduct;

    // Puis on incrémente la section voulu de chaque produit grace à la méthode .map 
    sectionItems.innerHTML = addProduct.map((product) =>
        `
        <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
            <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.color}</p>
                    <p>${(product.price)*(product.quantity)} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : ${product.quantity}</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>
        `
        
    );

    // si addproduct n'a pas de contenu, alors on masque le formulaire de commande pour ne pas gérer des commandes vide plus tard
    }else{
        cartOrder.style.display = "none";
    }
};
cartDisplay();




//-------------
// EVENEMENTS
//-------------
