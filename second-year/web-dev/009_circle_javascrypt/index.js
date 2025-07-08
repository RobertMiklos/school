const pi = 3.14;

document.getElementById("submit").onclick = function(){
    let polomer = document.getElementById("text").value;
    polomer = Number(polomer);
    let obvod = 2 * pi * polomer;
    let plocha = pi * polomer ** 2;
    document.getElementById("result_obvod").textContent = `Poloměr je:  ${obvod}cm`;
    document.getElementById("result_plocha").textContent = `Plocha je:  ${plocha}cm2`;
}