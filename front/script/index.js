//*******************************************************************************************
//                                       VARIABLES
//*******************************************************************************************


//*********************************
// Variable dans laquelle on va ajouter du contenu
const itemsSection = document.getElementById("items");
//*********************************




//*********************************
// Tableau qui va contenir la data des produits du fetch
let dataProducts = [];
//*********************************




//*******************************************************************************************
//                                       FONCTIONS
//*******************************************************************************************


//*********************************
// Fonction de fetch des produits
async function fetchProducts() {
    await fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((data) => dataProducts = data)
    productsDisplay();
};
fetchProducts();
//*********************************




//*********************************
// Fonction d'affichage des produits
function productsDisplay() {
    // itemsSection.innerHTML = dataProducts

    //     // méthode .map pour créé du contenu à chaque objet (product)
    //     .map((product) => 
    //     `
    //     <a href="./product.html?id=${product._id}">
    //         <article>
    //             <img src="${product.imageUrl}" alt="Le canapé ${product.name}">
    //             <h3 class="productName">${product.name}</h3>
    //             <p class="productDescription">${product.description}</p>
    //         </article>
    //     </a>
    //     `
    //     )

    //     // on enleve les virgules qui séparent les objets
    //     .join("");

    // Le innerHTML étant déconseillé par MDN, on utilise une autre manière
    dataProducts.forEach(product=>{

        let baliseHref = document.createElement("a");
        baliseHref.setAttribute("href", `./product.html?id=${product._id}`);
        itemsSection.appendChild(baliseHref);

        let article = document.createElement("article");
        baliseHref.appendChild(article);

        let img = document.createElement("img");
        img.setAttribute("src", `${product.imageUrl}`);
        img.setAttribute("alt", `Le canapé ${product.name}`);
        article.appendChild(img);

        let titleH3 = document.createElement("h3");
        titleH3.classList.add("productName");
        titleH3.textContent = `${product.name}`;
        article.appendChild(titleH3);

        let paraDescription = document.createElement("p");
        paraDescription.classList.add("productDescription");
        paraDescription.textContent = `${product.description}`;
        article.appendChild(paraDescription);
    });
};
//*********************************