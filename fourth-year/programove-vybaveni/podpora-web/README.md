# VDF Games – Technická podpora

Webová aplikace zákaznické podpory (Flask + OpenAI-compatible Chat API).

## Nasazení na Render.com

1. Vytvořte na Render.com nový **Web Service** připojený k tomuto GitHub repozitáři.
2. Nastavte **Root Directory** na: `fourth-year/programove-vybaveni/podpora-web` *(pokud je celý repozitář `school`; pokud máte samostatný repozitář jen s těmito soubory, nechte prázdné)*.
3. **Build Command**: `pip install -r requirements.txt`
4. **Start Command**: `gunicorn app:app`
5. V sekci **Environment Variables** přidejte zdarma API klíč z jednoho z těchto poskytovatelů:
   - **Groq (zdarma bez karty):** klíč z `console.groq.com` (`gsk_...`) jako `OPENAI_API_KEY` *(nebo `GROQ_API_KEY`)* — automaticky použije `llama-3.3-70b-versatile`.
   - **Google Gemini (zdarma bez karty):** klíč z `aistudio.google.com` (`AIza...`) jako `OPENAI_API_KEY` *(nebo `GEMINI_API_KEY`)* — automaticky použije `gemini-2.5-flash`.
   - **OpenAI:** klíč (`sk-...`) jako `OPENAI_API_KEY` — použije `gpt-4o-mini`.
   - Volitelně `OPENAI_MODEL` a `OPENAI_BASE_URL` pro vlastní model/poskytovatele.
