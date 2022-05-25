//*******************************************************************************************
//                                       VARIABLES
//*******************************************************************************************


//*********************************
// Contenu du LS
let localStorageContains = JSON.parse(localStorage.getItem("basket"));

// Pour afficher ou non le formulaire selon si le panier existe
let formDiv = document.querySelector(".cart__order");

if(localStorageContains == null || localStorageContains.length == 0){
    formDiv.style.display = "none";
}
//*********************************




//*********************************
// On créé la variable qui va contenir le résultat du prix total
let calculPriceTotal = 0;

// On créé la variable qui va contenir le résultat de la quantité totale
let calculProductsTotal = 0;
//*********************************




//*******************************************************************************************
//                                        FONCTIONS
//*******************************************************************************************


//*********************************
function displayBasket(){
// On va afficher chaque contenu du LSC en faisant une fetch de sa fiche produit, on pourra donc accéder au prix
for (let product of localStorageContains){
    // Fetch identique que celle de la page produit seul
    fetch(`http://localhost:3000/api/products/${product.id}`)
        .then((response)=> response.json())

        // Ce then permet de commencer par l'affichage, avec en paramètre de fonction les "data" (nom modifié pour que ce soit plus parlant)
        .then(function (productInfos) {
            // Variable qui fait référence à la section qui contient tous les éléments
            let section = document.getElementById("cart__items");
            
            // Condition pour avoir du contenu dans le LSC
            if(localStorageContains != null){
        
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
                img.setAttribute("src", `${productInfos.imageUrl}`);
                img.setAttribute("alt", `${productInfos.altTxt}`);
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
                nameProduct.textContent = `${productInfos.name}`;
                divDescription.appendChild(nameProduct);
            
                // Couleur du produit
                let colorProduct = document.createElement("p");
                colorProduct.textContent = `${product.color}`;
                divDescription.appendChild(colorProduct);
            
                // Prix du produit, on créé une variable de calcul pour isoler les valeurs, puis on rajoute le € au textContent, on incrémente la variable de total déclarée en début de script
                let priceProduct = document.createElement("p");
                let priceCalcul = productInfos.price * product.quantity;
                priceProduct.textContent = `${priceCalcul} €`;
                divDescription.appendChild(priceProduct);
                calculPriceTotal += priceCalcul;
            
                // La div qui contient bouttons et input
                let divSettings = document.createElement("div");
                divSettings.classList.add("cart__item__content__settings");
                divAllTxt.appendChild(divSettings);
            
                // La div qui contient input quantité
                let divQuantity = document.createElement("div");
                divQuantity.classList.add("cart__item__content__settings__quantity");
                divSettings.appendChild(divQuantity);
            
                // Info de la quantité, même principe que le prix pour la quantité totale
                let paraQuantity = document.createElement("p");
                paraQuantity.classList.add("infoQuantity");
                paraQuantity.textContent = `Qté : ${product.quantity}`;
                divQuantity.appendChild(paraQuantity);
                calculProductsTotal += product.quantity;
            
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
            };
        })

        // Une fois que le premier then est terminé, on effectu cette fonction qui ajoute les deux totaux à leur emplacement, le fait de faire cela permet de ne pas calculer les totaux avant que tous les articles soient affichés
        .then(function () {
            let totalProducts = document.getElementById("totalQuantity"); 
            totalProducts.textContent = calculProductsTotal;

            let totalPrice = document.getElementById("totalPrice");
            totalPrice.textContent = calculPriceTotal;
        })
        .catch((error) => alert("Cette erreur est survenue : " + error))
};
};
displayBasket();
//*********************************




//*******************************************************************************************
//                                     EVENEMENTS avec Fonctions
//*******************************************************************************************


//*********************************
// On met l'évènement supprmier dans une fonction pour pouvoir mettre un setTimeOut plus bas
function deleteItem(){
    // On récupère les para du boutton supprimer
    let paraDelete = document.querySelectorAll(".deleteItem");

    // On créé une boucle pour passer sur tous les bouttons
    for(let i = 0; i < paraDelete.length; i++){
        // Evenement sur chaque boutton
        paraDelete[i].addEventListener("click", ()=>{
            // On fait un contre filtre pour récupérer ceux qui ne correspondent pas, l'autre en question est supprimé
            localStorageContains = localStorageContains.filter(element => element.id != paraDelete[i].id || element.color != paraDelete[i].dataset.color);

            // On renvoi les données actuelles dans le LS
            localStorage.setItem("basket", JSON.stringify(localStorageContains));

            // On reload la page pour avoir l'affichage à jour (la fonction affiche plusieurs fois le panier, et pas à jour si on ne reload pas)
            location.reload();
        });
    };
};

// Ce setTimeout permet d'attendre que tous les fetch soient réalisés plus haut
setTimeout(deleteItem, 500);
//*********************************




//*********************************
// On met l'évènement supprmier dans une fonction pour pouvoir mettre un setTimeOut plus bas
function changeQuantity(){
    // On récupère les input qui gèrent la quantité
    let inputQuantity = document.querySelectorAll(".itemQuantity");

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
};

// Ce setTimeout permet d'attendre que tous les fetch soient réalisés plus haut
setTimeout(changeQuantity, 500);
//*********************************