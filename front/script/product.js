//-------------
// VARIABLES
//-------------

// On isole l'ID de l'élément cliqué sur la page d'accueil
const productId = window.location.search.split("?id=").join("");

// Variables dans lesquelles on va ajouter du contenu
const itemImg = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
const addToCart = document.getElementById("addToCart");

// Tableau qui va contenir les produits du localStorage
let dataProduct = [];


//-------------
// FONCTIONS
//-------------

// Fonction fetch du produit cliqué
async function fetchProduct() {
    await fetch(`http://localhost:3000/api/products/${productId}`)
        .then((res) => res.json())
        .then((data) => dataProduct = data)
    console.log(dataProduct);
    productDisplay();
};
fetchProduct();

// Fonction d'affichage des produits
function productDisplay() {
    itemImg.innerHTML = `<img src="${dataProduct.imageUrl}" alt="${dataProduct.altTxt}">`;
    title.textContent = `${dataProduct.name}`;
    price.textContent = `${dataProduct.price} `;
    description.textContent = `${dataProduct.description}`;

    // ForEach pour créer une balise option en fonction du nombre de couleurs u produit de la page
    dataProduct.colors.forEach(color => {
        let baliseOption = document.createElement("option");
        baliseOption.textContent = `${color}`;
        baliseOption.value = `${color}`;
        colors.appendChild(baliseOption);
    });
};


//-------------
// EVENEMENTS
//-------------

// Click sur le boutton ajouter au panier
addToCart.addEventListener("click", ()=>{

    // Cette variable contient la valeur de la clé "product" du localstorage (grace a getItem), la méthode parse construit l'objet à partir de la chaine de product
    let tabProduct = JSON.parse(localStorage.getItem("product"));
 
    // On créé un objet qui reprend tout de dataProduct et on y incrémente la couleur choisi ainsi que la quantité 
    const addColorQuantity = Object.assign({}, dataProduct, {
        color: colors.value,
        // Pour ne pas melanger chaine et nombre, methode number
        quantity: Number(quantity.value)
    });

    // si le tabproduct est vide (donc pas de LS) et que la balise option couleur est différente de vide et que la balise option quantité est différente de 0, alors on défini tabproduct en tableau, on y incrémente le new tableau avec valeurs en +, on créé une clé "product" en y mettant en valeur chaine le tabproduct, puis on construit l'objet avec parse. On a notre LS. (ces conditions permettent de ne pas envoyer un panier avec des quantité 0 et sans couleur)
    if(tabProduct == null && colors.value != "" && quantity.value != 0 ){
        tabProduct = [];
        tabProduct.push(addColorQuantity);
        localStorage.setItem("product", JSON.stringify(tabProduct));
        tabProduct = JSON.parse(localStorage.getItem("product"));

    // sinon si tabproduct a du contenu, 
    }else if(tabProduct != null){

        // on fait parcourir une boucle dans ses objets pour voir si l'id de i est égal à l'id du produit sous nos yeux et la color de i correspond à la couleur sous nos yeux, alors on incrémente la quantité de cet objet i par la valeur de la quantité sous nos yeux. On ajoute dans le LS existant la valeur grace a return qui ne va pas continuer sur l'autre boucle
        for (let i = 0; i < tabProduct.length; i++){
            if(tabProduct[i]._id == dataProduct._id && tabProduct[i].color == colors.value){
                return (tabProduct[i].quantity += Number(quantity.value),
                localStorage.setItem("product", JSON.stringify(tabProduct)));
            };
        };

        // on refait parcourir une boucle si la précédente n'est pas retournée, si l'id de i coorespond à l'id sous nos yeux ET la couleur de i est différente de la couleur sous nos yeux ET que celle si n'est pas vide, OU l'id de i est différent de l'id sous nos yeux ET que la couleur sous nos yeux n'est pas vide ET que la quantité sous nos yeux nest pas 0, alors on y incrémente le new tableau avec valeurs en +, on créé une clé "product" en y mettant en valeur chaine le tabproduct, puis on construit l'objet avec parse. On a notre LS
        for (let i = 0; i < tabProduct.length; i++){
            if((tabProduct[i]._id == dataProduct._id && tabProduct[i].color != colors.value && colors.value != "") || (tabProduct[i]._id != dataProduct._id && colors.value != "" && quantity.value != 0)){
                return (tabProduct.push(addColorQuantity),
                localStorage.setItem("product", JSON.stringify(tabProduct)), tabProduct = JSON.parse(localStorage.getItem("product")));
            };
        };
    };
});
