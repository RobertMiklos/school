const decrease_btn = document.getElementById("decrease_btn");
const reset_btn = document.getElementById("reset_btn");
const increase_btn = document.getElementById("increase_btn");
let num = document.getElementById("count_num");
let result = 0;

decrease_btn.onclick = function(){
    result--;
    num.textContent = result;
}

reset_btn.onclick = function(){
    result = 0;
    num.textContent = result;
}

increase_btn.onclick = function(){
    result++;
    num.textContent = result;
}