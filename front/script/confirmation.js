

//-------------
// VARIABLES
//-------------
let spanOrderId = document.getElementById("orderId");
let orderIdLS = JSON.parse(localStorage.getItem("orderId"))
spanOrderId.textContent = orderIdLS;
localStorage.clear();


//-------------
// FONCTIONS
//-------------




//-------------
// EVENEMENTS
//-------------