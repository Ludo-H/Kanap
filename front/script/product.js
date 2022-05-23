//-------------
// VARIABLES
//-------------


//*******************************************************************
// On isole l'ID de l'élément cliqué sur la page d'accueil
const productId = window.location.search.split("?id=").join("");
//*******************************************************************




//*******************************************************************
// Variables dans lesquelles on va ajouter du contenu
const itemImg = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
const addToCart = document.getElementById("addToCart");
//*******************************************************************




//*******************************************************************
// Tableau qui va contenir les data du canapé cliqué
let dataProduct;
//*******************************************************************




//-------------
// FONCTIONS
//-------------


//*******************************************************************
// Fonction fetch du produit cliqué
async function fetchProduct() {
    await fetch(`http://localhost:3000/api/products/${productId}`)
        .then((res) => res.json())
        .then((data) => dataProduct = data)
    productDisplay();
};
fetchProduct();
//*******************************************************************




//*******************************************************************
// Fonction d'affichage des produits
function productDisplay() {
    let imgProduct = document.createElement("img");
    imgProduct.setAttribute("src", `${dataProduct.imageUrl}`);
    imgProduct.setAttribute("alt", `${dataProduct.altTxt}`);
    itemImg.appendChild(imgProduct);
    title.textContent = `${dataProduct.name}`;
    price.textContent = `${dataProduct.price} `;
    description.textContent = `${dataProduct.description}`;

    // ForEach pour créer une balise option en fonction du nombre de couleurs du produit de la page
    dataProduct.colors.forEach(color => {
        let baliseOption = document.createElement("option");
        baliseOption.textContent = `${color}`;
        baliseOption.value = `${color}`;
        colors.appendChild(baliseOption);
    });
};
//*******************************************************************




//*******************************************************************
// On envoi du contenu dans le LS sous le nom de "basket"
function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}
//*******************************************************************




//*******************************************************************
// On récupère le contenu du LS, si il est vide on récupère un tableau vide, sinon on récupère le contenu sous une syntaxe exploitable
function getBasket() {
    let basket = localStorage.getItem("basket");
    if(basket == null){
        return [];
    }else{
        return JSON.parse(basket);
    }
}
//*******************************************************************




//*******************************************************************
// On récupère dabord le contenu du LS, on définie une variable qui va stocker un article qui serait identique à celui cliqué par l'utilisateur. Selon son résultat, on incrémente uniquement la quantité ou on ajoute l'article dans la variable du début (basket) au panier grâce à savebasket.
function addBasket(product) {
    let basket = getBasket();
    let foundProduct = basket.find(basketProduct => basketProduct.id == product.id && basketProduct.color == product.color);
    if(foundProduct != undefined){
        foundProduct.quantity += product.quantity;
        alert("Produit ajouté au panier")
    }else if (product.color != "" && product.quantity > 0){
        basket.push(product);
        alert("Produit ajouté au panier")
    }
    saveBasket(basket);
}
//*******************************************************************




//-------------
// EVENEMENTS
//-------------


//*******************************************************************
// Click sur le boutton ajouter au panier
addToCart.addEventListener("click", ()=>{

    // On créé une variable qui va représenter les données du produit ajouté dans le panier, qui nous serviront plus tard
    let newProduct = {dataProduct, color: colors.value, quantity: Number(quantity.value), id: dataProduct._id}
    addBasket(newProduct);
});
//*******************************************************************