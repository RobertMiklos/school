let main = document.getElementById("main")
let resetBtn = document.getElementById("reset")
const size = 10

function createBoard(){
    main.innerHTML = ""
    for (let row = 0; row < size; row++){
        for (let col = 0; col < size; col++){
            const square = document.createElement("div")
            square.classList.add("square")
            square.classList.add((row + col) % 2 === 0 ? "white" : "black")

            square.addEventListener("click", () => {
                if (square.classList.contains("white")){
                    square.classList.remove("white")
                    square.classList.add("black")
                }else{
                    square.classList.remove("black")
                    square.classList.add("white")
                }
            })
            
            main.appendChild(square)
        }   
    }
}

resetBtn.addEventListener("click", createBoard)
createBoard()
