const form = document.getElementById("numberForm");
const input = document.getElementById("numberInput");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = input.value.trim();

  if (!/^[0-9]+$/.test(value) || Number(value) <= 0) {
    alert("Zadej prosím celé kladné číslo!");
    return;
  }

  const number = Number(value);

  if (number % 2 === 0) {
    alert("Číslo je sudé.");
  } else {
    alert("Číslo je liché.");
  }
});