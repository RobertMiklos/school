// Přepínač: false = demo bez backendu, true = reálný backend
const USE_BACKEND = true;

// Pokud web běží ze serveru (Render / lokální Flask), použije se stejná doména (/chat).
const BACKEND_URL =
  window.location.protocol === "file:"
    ? "http://localhost:8000/chat"
    : "/chat";
const STUDENT_ID = "Robert_Miklos_4ITE";

const form = document.getElementById("question-form");
const textarea = document.getElementById("question");
const emailInput = document.getElementById("email");
const answerDiv = document.getElementById("answer");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = textarea.value.trim();
  const email = emailInput.value.trim();

  if (!text) {
    answerDiv.textContent = "Nejdřív napiš dotaz.";
    return;
  }

  // vždy ukážeme "loading"
  answerDiv.textContent = "Zpracovávám dotaz…";
  form.querySelector("button").disabled = true;

  try {
    const payload = {
      message: text,
      student: STUDENT_ID,
      email: email || null
    };

    // --- FAKE MODE (bez backendu) ---
    if (!USE_BACKEND) {
      answerDiv.textContent =
        `Demo odpověď (bez serveru)\n\n` +
        `Student: ${payload.student}\n` +
        `Dotaz: ${payload.message}`;
      return;
    }

    // --- REAL MODE (s backendem) ---
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      answerDiv.textContent = data.error
        ? "Chyba serveru: " + data.error
        : "Server vrátil chybu: " + res.status;
      return;
    }

    if (data.reply) {
      answerDiv.textContent = data.reply;
    } else if (data.error) {
      answerDiv.textContent = "Chyba serveru: " + data.error;
    } else {
      answerDiv.textContent = "Server nevrátil žádnou odpověď.";
    }
  } catch (err) {
    console.error(err);
    answerDiv.textContent = "Nepodařilo se spojit se serverem.";
  } finally {
    form.querySelector("button").disabled = false;
    textarea.value = "";
  }
});
