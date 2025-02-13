let item = "bike";  // takhle se vytváří promněnná
item = "car" // takhle se mění promněnná
alert(item) // na stránce vyskočí okénko s nápisem car ihned po načtení stránky
console.log(item) // takhle se píše do konzole
document.getElementById("p1").textContent = "Updated text" // accesuji element p1 a přepisuju ho na "Updated text"
let heading = document.getElementById("h1") // do promněnné uložím element s id="h1"
heading.textContent = "Welcome" // přeisuji promněnnou heading
function doSometning() { // takhle se vytváří funkce
    let x = "Game Over";
    alert(x);
    console.log(x);
}
