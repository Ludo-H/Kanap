//-------------
// VARIABLES
//-------------
let dataProducts = [];


//-------------
// FONCTIONS
//-------------
async function fetchProducts() {
    await fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((data) => dataProducts = data)
}


//-------------
// OBJETS
//-------------



//-------------
// EVENEMENTS
//-------------