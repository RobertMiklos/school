## Proměnný

``` JS
let city = "Varnsdorf"
const pi = 3.14
```
- Proměnnou lze měnit ale konstantu ne.

## Datové typy

``` JS
let name = "Robert" // string
let ballance = 666 // integer
```

## Změna elementu

``` JS
document.getElementById("MainHeader").textContent = "napdis"
```
- Na získání elementu z html se používá `document.getElementBy...("")`.
- Mužeš použít `.textContent = ""` na změnu textu nějakého elementu.

## Výpis

``` JS
alert("New Message") // do prohlížeče
console.log("Done Loading the page") // do konzole v přohlížeči
```

## DOM

``` JS
<p id="p3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

let paragraph3 = document.getElementById("p3")
alert(paragraph3.textContent)
```
- Jakmile chceš vypsat element, který je v DOM tak musíš použít `.textContent`

## Změna CSS v JS

``` JS
function changeColor() {
    let x = document.getElementById("p1")
    x.style.color = "green"
}
changeColor()
```
- Používá se na to `idk.style.color = ""`

## Input

``` JS
let userName = prompt("Please enter your name")
```
- Když použiješ `prompt("")` vyskočí ti okno do kterého můžeš psát.

``` JS
let input3 = document.getElementById("t2")
console.log(input3.value)
```
- Když chceš použít input například z formuláře tak musíš použít `.value`