//*******************************************************************************************
//                                       VARIABLES
//*******************************************************************************************


//*********************************
// Variable de l'input correspondant
let firstName       = document.getElementById("firstName");

// Para message de l'input
let errorFirstName  = document.getElementById("firstNameErrorMsg");

// Variable qui contient la regex de l'input
let firstNameRegex  = new RegExp(/^[A-Za-zéèê]{3,20}$/);  
//*********************************




//*********************************
let lastName        = document.getElementById("lastName"); 
let errorLastName   = document.getElementById("lastNameErrorMsg");
let lastNameRegex   = new RegExp(/^[A-Za-zéèê]{3,20}$/);
//*********************************




//*********************************
let adress          = document.getElementById("address");
let errorAdress     = document.getElementById("addressErrorMsg");
let adressRegex     = new RegExp(/^[a-zA-Z0-9\s,.éèê'-]{3,}$/);
//*********************************




//*********************************
let city            = document.getElementById("city"); 
let errorCity       = document.getElementById("cityErrorMsg");
let cityRegex       = new RegExp(/^[a-zA-Z0-9\s,.'-]{3,}$/);
//*********************************




//*********************************
let email           = document.getElementById("email"); 
let errorEmail      = document.getElementById("emailErrorMsg");
let emailRegex      = new RegExp(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/);
//*********************************




//*********************************
let form            = document.querySelector(".cart__order__form");
let order           = document.getElementById("order");
//*********************************




//*******************************************************************************************
//                                       FONCTIONS
//*******************************************************************************************


//*********************************
// La fonction recupère un parametre auquel on va récupérer sa .value (texte rentré), et le comparer avec sa regex déclarée plus haut. Le texte en dessous de l'input varie selon le résultat et renvoi une valeur booleenne pour l'exploiter plus tard
function checkFirstName(element) {
    if(firstNameRegex.test(element.value)){
        errorFirstName.textContent = "Prénom valide";
        return true;
     }else{
        errorFirstName.textContent = "Prénom invalide : 3-20 caractères, pas de chiffre, pas de caractère spécial";
        return false;
     };
}
//*********************************




//*********************************
function checkLastName(element) {
    if(lastNameRegex.test(element.value)){
        errorLastName.textContent = "Nom valide";
        return true;
    }else{
        errorLastName.textContent = "Nom invalide : 3-20 caractères, pas de chiffre, pas de caractère spécial";
        return false;
    };
}
//*********************************




//*********************************
function checkAdress(element) {
    if(adressRegex.test(element.value)){
        errorAdress.textContent = "Adresse valide";
        return true;
     }else{
        errorAdress.textContent = "Veuillez préciser l'adresse";
        return false;
     };
}
//*********************************




//*********************************
function checkCity(element) {
    if(cityRegex.test(element.value)){
        errorCity.textContent = "Ville valide";
        return true;
     }else{
        errorCity.textContent = "Veuillez préciser une ville";
        return false;
     };
}
//*********************************




//*********************************
function checkEmail(element) {
    if(emailRegex.test(element.value)){
        errorEmail.textContent = "Email valide";
        return true;
     }else{
        errorEmail.textContent = "Email Invalide";
        return false;
     };
}
//*********************************




//*******************************************************************************************
//                                       EVENEMENTS
//*******************************************************************************************


//*********************************
// Evenement sur l'input prénom
firstName.addEventListener("change", function(){

    // This fait référence à firstname, on va donc avoir true ou false (voir fonction plus haut)
    checkFirstName(this);
});
//*********************************




//*********************************
// Evenement sur l'input nom
lastName.addEventListener("change", function (){
    checkLastName(this);
});
//*********************************




//*********************************
// Evenement sur l'input adresse
adress.addEventListener("change", function(){
    checkAdress(this)
});
//*********************************




//*********************************
// Evenement sur l'input ville
city.addEventListener("change", function(){
    checkCity(this);
});
//*********************************




//*********************************
// Evenement sur l'input email
email.addEventListener("change", function(){
    checkEmail(this);
});
//*********************************




//*********************************
// On écoute la validation du formulaire
form.addEventListener("submit", ()=>{

    // Les valeurs true et false retournées sont importantes à ce niveau, la condition est valide uniquement si false n'apparait pas
    if(checkFirstName(firstName) && checkLastName(lastName) && checkAdress(adress) && checkCity(city) && checkEmail(email)){

        // Le tableau qui va contenir les id des produits
        let idProductsTab = [];
        for(let i = 0; i < localStorageContains.length; i++){
            idProductsTab.push(localStorageContains[i].id)
        }

        // L'objet contenant les renseignements de l'utilisateur
        const userForm = {
            firstName : firstName.value,
            lastName : lastName.value,
            address : adress.value,
            city : city.value,
            email : email.value
        };
        
        // L'objet contenant les renseignements attendus par le server
        const contactAndProducts = {
            contact : userForm,
            products : idProductsTab
        };

        // La variable qui va contenir l'order id envoyé par le back
        let backOrderId;

        // Fetch faisant la méthode POST, on envoie l'objet avec la syntaxe exploité par le LS
        fetch("http://localhost:3000/api/products/order",{
            method : "POST",
            body : JSON.stringify(contactAndProducts),
            headers : {
                "Content-Type" : "application/json"
            },
        })
            .then((response)=> response.json())
            .then((data) => {

                // On stocke l'order id retourné
                backOrderId = data.orderId;

                // On redirige l'utilisateur vers la page de confirmation
                window.location.href = `http://127.0.0.1:5500/front/html/confirmation.html?commande=${backOrderId}`;
            })
            .catch((error) => alert("Cette erreur est survenue : " + error))
    }else{
        alert("Vérifiez les information saisies");
    }
});
//*********************************