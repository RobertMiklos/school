# VDF Games – Technická podpora

Webová aplikace zákaznické podpory (Flask + OpenAI Responses API).

## Nasazení na Render.com

1. Vytvořte na Render.com nový **Web Service** připojený k tomuto GitHub repozitáři.
2. Nastavte **Root Directory** na: `fourth-year/programove-vybaveni/podpora-web` *(pokud je celý repozitář `school`; pokud máte samostatný repozitář jen s těmito soubory, nechte prázdné)*.
3. **Build Command**: `pip install -r requirements.txt`
4. **Start Command**: `gunicorn app:app`
5. V sekci **Environment Variables** přidejte:
   - `OPENAI_API_KEY` = váš OpenAI API klíč
   - `OPENAI_MODEL` = např. `gpt-4o-mini` *(nepovinné, výchozí je `gpt-4o-mini`)*
