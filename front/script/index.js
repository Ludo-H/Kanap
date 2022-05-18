//-------------
// VARIABLES
//-------------

// Variables dans lesquelles on va ajouter du contenu
const itemsSection = document.getElementById("items");

// Tableau qui va contenir data des produits du fetch
let dataProducts = [];


//-------------
// FONCTIONS
//-------------

// Fonction de fetch des produits
async function fetchProducts() {
    await fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((data) => dataProducts = data)
    console.log(dataProducts);
    productsDisplay();
};
fetchProducts();

// Fonction d'affichage des produits
function productsDisplay() {
    itemsSection.innerHTML = dataProducts

        // méthode .map pour créé du contenu à chaque objet (product)
        .map((product) => 
        `
        <a href="./product.html?id=${product._id}">
            <article>
                <img src="${product.imageUrl}" alt="Le canapé ${product.name}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
            </article>
        </a>
        `
        )

        // on enleve les virgules qui séparent les objets
        .join("");
};



//-------------
// EVENEMENTS
//-------------