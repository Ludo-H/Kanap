//-------------
// VARIABLES
//-------------

// On isole l'ID de l'élément cliqué sur la page d'accueil
const productId = window.location.search.split("?id=").join("");

const itemImg = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
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

    dataProduct.colors.forEach(color => {
        let baliseOption = document.createElement("option");
        baliseOption.textContent = `${color}`;
        baliseOption.value = `${color}`;
        colors.appendChild(baliseOption);
    });
}


//-------------
// OBJETS
//-------------



//-------------
// EVENEMENTS
//-------------