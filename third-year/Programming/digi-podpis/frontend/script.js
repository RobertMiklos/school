async function getData() {
    try{
        const response = await fetch("id.json")

        if (!response.ok) {
            throw new Error("Chyba při stahování dat")
        }
        const data = await response.json()
        return data.ucty
    } catch (error){
        console.error(error)
    }
}

let btn = document.getElementById("btn")

btn.onclick = async function() {
    let userSelect = document.getElementById("userSelect").value
    let userFound = await getData()

    let x = userFound.find(i => i.name === userSelect)
    
}

document.getElementById('inputFile').addEventListener("change", function(event) {
    const file = event.target.files[0]
})