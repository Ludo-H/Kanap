//*******************************************************************************************
//                                       VARIABLES
//*******************************************************************************************


// On récupère la zone d'affchage voulu
let spanOrderId = document.getElementById("orderId");

// On récupère au bon format l'orderId créé et rangé auparavant
let orderIdURL = window.location.search.split("?commande=").join("");

// On ajoute cet orderId en texte sur la zone voule
spanOrderId.textContent = orderIdURL;

// On vide le LS pour pouvoir recommencer un achat de 0
localStorage.clear();