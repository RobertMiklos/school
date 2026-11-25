# ⚡ ElektroRozvaděč – Výuková webová hra

Interaktivní vzdělávací simulátor zapojování domovního elektrického rozvaděče (instalace TN-S 230 V / 50 Hz). Hra běží v čistém **HTML5, CSS3 a moderním JavaScriptu (ES6+)** bez jakýchkoli externích knihoven či závislostí.

---

## 🎯 Vzdělávací záměr (Co se hráč naučí a proč)

Elektrotechnika a zapojování rozvaděčů bývá pro studenty a začínající elektrikáře často abstraktní. Běžná výuka se opírá o statická schémata a poučky v učebnicích, kde chybí možnost praktického ověření příčiny a následku.

**Tato hra staví na didaktickém přístupu „Učení činností a okamžitou zpětnou vazbou“:**
1. **Pochopení toku proudu a cesty vodičů:**
   - **Fázový vodič (L – hnědá):** Musí procházet spínacími (hlavní vypínač QS) a ochrannými prvky (jistič MCB, chránič RCD).
   - **Střední nulový vodič (N – modrá):** Slouží jako pracovní návratový vodič obvodu.
   - **Ochranný vodič (PE – zeleno-žlutá):** Pospojování koster spotřebičů třídy I a kolíků zásuvek do PE svorkovnice. *Nikdy nesmí vést fázi ani být přerušen spínačem.*
2. **Klíčový koncept proudového chrániče (RCD 30 mA):**
   - Hráč pochopí, proč chránič funguje jako součtový transformátor porovnávající proudy v L a N.
   - Na vlastní kůži zažije častou montážní chybu: pokud nulák spotřebiče za chráničem zapojí na hlavní N lištu místo za chránič, chránič okamžitě vybaví.
3. **Typy jištění a dimenzování:**
   - Rozdíl mezi jističem B10 pro světelné okruhy a B16 pro zásuvkové a silové obvody.
4. **Bezpečnostní rizika a normy (ČSN EN 60446, ČSN 33 2000-4-41):**
   - Hra okamžitě srozumitelným jazykem vysvětlí, proč je nebezpečný zkrat (L–N), zemní spojení (L–PE) nebo fáze na kostře spotřebiče.

---

## 🎮 Zábavnost (Gamifikace a motivace)

- **Okamžitá audiovizuální odezva:** Po stisknutí *„Zapnout / Otestovat“* se rozsvítí realistická žárovka, sepne LED tester v zásuvce nebo zabzučí digitální multimetr.
- **Bezpečné experimentování metodou pokus–omyl:** Hráč si může bez obav vyzkoušet zapojit zkrat nebo prohodit vodiče – virtuální jistič „vystřelí“ s doprovodným zvukovým efektem bez jakéhokoliv rizika úrazu či škody.
- **Taktilní ovládání vodičů:** Plynulé natahování vodičů pomocí kubických Bézierových křivek s autentickými barvami (včetně pruhovaného zelenožlutého vodiče PE), snadné odpojování kliknutím i krokování zpět.
- **Stupňování náročnosti (5 úrovní):**
  1. *Úroveň 1: Základní světelný okruh* – Seznámení se spínáním L přes vypínač a jistič B10 a nulákem N.
  2. *Úroveň 2: Ochranný vodič PE a kovové svítidlo* – Připojení svorkovnice PE a ochrana před nebezpečným dotykem (třída I).
  3. *Úroveň 3: Zásuvkový okruh s chráničem (RCD)* – Zapojení fáze i nuláku přes chránič 30 mA a jistič B16.
  4. *Úroveň 4: Dva okruhy a oddělené N můstky* – Světlo bez RCD + zásuvka s RCD; pochopení oddělení nechráněné N lišty a lišty za chráničem.
  5. *Úroveň 5: Detektivní výzva: Oprava kutilova zapojení* – Diagnostika hotového rozvaděče, odhalení smrtelného napětí na kostře bojleru a jeho bezpečné přepojení.

---

## 📊 Měření pokroku a statistiky

Hra ukládá výsledky a data do `localStorage` prohlížeče. Sleduje následující klíčové metriky:
- **Počet dokončených úrovní (0 až 5):** Rychlý přehled pro pedagoga či hráče.
- **Úspěšnost napoprvé (%):** Procento úrovní, které hráč vyřešil na první pokus bez jediné chyby. Tento údaj přímo odráží, zda hráč látce doopravdy rozumí a pouze netipuje.
- **Počet pokusů a chyb:** Celkový počet provedených testů a zaznamenaných zkratů/poruch. Klesající počet chyb v dalších úrovních dokazuje postup v učení.
- **Čas řešení:** Stopky pro každou úroveň a celkový čas potřebný k dokončení celé elektroinstalace.
- **Závěrečné osvědčení:** Po úspěšném zvládnutí všech 5 úrovní hráč obdrží virtuální osvědčení *„Mistr elektroinstalací“*.

Všechny statistiky lze kdykoliv zobrazit kliknutím na tlačítko **📊 Statistiky** v záhlaví aplikace a v případě potřeby je jedním kliknutím resetovat.

---

## 🚀 Jak hru spustit

Aplikace nevyžaduje žádnou instalaci, Node.js, balíčkovací manažery ani webový server. Funguje v jakémkoliv moderním webovém prohlížeči (Chrome, Edge, Firefox, Safari, Opera).

1. Stáhněte nebo naklonujte složku projektu.
2. Dvojklikem otevřete soubor **`index.html`** ve svém webovém prohlížeči (nebo jej přetáhněte do otevřeného okna prohlížeče).
3. Hra je okamžitě připravena ke hraní.

### Struktura souborů projektu

- **`index.html`**: Sémantická struktura rozvaděčové skříně, DIN lišty, modulárních přístrojů, SVG plátna pro vodiče, panelu spotřebičů a modálních oken.
- **`style.css`**: Kompletní vizuální stylizace – realistický kovový povrch DIN lišty, modulární jističe s páčkami I/O, barevné svorkovnice, animovaná žárovka a zásuvka, zobrazení vodičů.
- **`game.js`**: Řídicí logika rozdělená do přehledných modulů:
  - *SoundEngine:* Procedurální syntéza zvuků přes Web Audio API (cvaknutí svorky, sepnutí vypínače, vybavení chrániče, elektrický zkrat, fanfára).
  - *StorageManager:* Ukládání a vyhodnocení pokroku v `localStorage`.
  - *LEVELS:* Datová konfigurace 5 úrovní.
  - *CircuitSimulator:* Grafový vyhodnocovací algoritmus prověřující vodivost, zkraty, cesty proudů, vybavení RCD a normy barev.
  - *UIController:* Obsluha interakcí myši, kreslení Bézierových křivek na SVG plátně, časovače a modálních oken.

---

## ⚠️ Bezpečnostní upozornění (Důležitá poznámka)

> **Upozornění:** Tato aplikace slouží výhradně jako **zjednodušená didaktická a školní simulace** pro pochopení základních fyzikálních a zapojovacích principů. Skutečné montáže, úpravy a revize elektrických rozvaděčů a instalací pod napětím smí provádět **výhradně osoby s elektrotechnickým vzděláním a platnou odbornou způsobilostí v elektrotechnice** (v ČR dle zákona č. 250/2021 Sb. a nařízení vlády č. 194/2022 Sb., dříve vyhlášky č. 50/1978 Sb.). Neodborný zásah do skutečné elektroinstalace může způsobit požár, škody na majetku nebo smrtelný úraz elektrickým proudem.
