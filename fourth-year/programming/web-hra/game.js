/**
 * ============================================================================
 * ElektroRozvaděč – Výukový simulátor zapojování domovního rozvaděče
 * Čistý JavaScript (ES6+), bez externích knihoven.
 * ============================================================================
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. ZVUKOVÝ SUBSYSTÉM (Web Audio API)
     Generuje realistické elektroakustické zvuky bez nutnosti externích MP3 souborů.
     ========================================================================== */

  const SoundEngine = {
    ctx: null,
    muted: false,

    init() {
      // AudioContext se vytvoří až po interakci uživatele dle pravidel moderních prohlížečů
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    },

    resume() {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    },

    toggleMute() {
      this.muted = !this.muted;
      return this.muted;
    },

    // Mechanické cvaknutí svorky při zapojení vodiče
    playConnect() {
      if (this.muted || !this.ctx) return;
      this.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(580, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    },

    // Zvuk přestřižení / odpojení vodiče
    playDisconnect() {
      if (this.muted || !this.ctx) return;
      this.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    },

    // Přepnutí jističe / vypínače (přesvědčivé mechanické lupnutí)
    playSwitch() {
      if (this.muted || !this.ctx) return;
      this.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    },

    // Vybavení proudového chrániče / jističe při poruše
    playTrip() {
      if (this.muted || !this.ctx) return;
      this.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(110, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    },

    // Elektrický zkrat / oblouk (50Hz brum s náběhem šumu)
    playShortCircuit() {
      if (this.muted || !this.ctx) return;
      this.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.linearRampToValueAtTime(50, now + 0.35);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    },

    // Fanfárový akord při úspěšném vyřešení obvodu
    playSuccess() {
      if (this.muted || !this.ctx) return;
      this.resume();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;

        const startTime = now + idx * 0.08;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.18, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.55);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.55);
      });
    }
  };

  /* ==========================================================================
     2. SPRÁVCE POKROKU A STATISTIK (localStorage)
     ========================================================================== */

  const StorageManager = {
    STORAGE_KEY: 'elektro_rozvadec_stats_v2',

    getStats() {
      try {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        if (raw) {
          return JSON.parse(raw);
        }
      } catch (e) {
        console.warn('Nelze načíst localStorage:', e);
      }
      return this.getDefaultStats();
    },

    getDefaultStats() {
      return {
        completedLevels: [],
        totalAttempts: 0,
        totalErrors: 0,
        firstTrySuccessCount: 0,
        totalTimeSpentSec: 0,
        levelStats: {}
      };
    },

    saveStats(stats) {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stats));
      } catch (e) {
        console.warn('Nelze uložit do localStorage:', e);
      }
    },

    recordAttempt(levelId, isError) {
      const stats = this.getStats();
      stats.totalAttempts++;
      if (isError) stats.totalErrors++;

      if (!stats.levelStats[levelId]) {
        stats.levelStats[levelId] = {
          attempts: 0,
          errors: 0,
          timeSec: 0,
          completed: false,
          firstTry: false
        };
      }
      stats.levelStats[levelId].attempts++;
      if (isError) stats.levelStats[levelId].errors++;

      this.saveStats(stats);
      return stats;
    },

    recordLevelCompletion(levelId, timeSec) {
      const stats = this.getStats();
      if (!stats.completedLevels.includes(levelId)) {
        stats.completedLevels.push(levelId);
      }

      if (!stats.levelStats[levelId]) {
        stats.levelStats[levelId] = {
          attempts: 1,
          errors: 0,
          timeSec: timeSec,
          completed: true,
          firstTry: true
        };
      } else {
        stats.levelStats[levelId].completed = true;
        stats.levelStats[levelId].timeSec = timeSec;
      }

      // Úspěch napoprvé: dokončeno na první pokus bez chyb
      if (stats.levelStats[levelId].attempts === 1 && stats.levelStats[levelId].errors === 0) {
        stats.levelStats[levelId].firstTry = true;
      }

      // Přepočet úspěchů napoprvé
      let firstTries = 0;
      Object.keys(stats.levelStats).forEach(key => {
        if (stats.levelStats[key].firstTry) firstTries++;
      });
      stats.firstTrySuccessCount = firstTries;
      stats.totalTimeSpentSec += timeSec;

      this.saveStats(stats);
      return stats;
    },

    resetAll() {
      const defaults = this.getDefaultStats();
      this.saveStats(defaults);
      return defaults;
    }
  };

  /* ==========================================================================
     3. DEFINICE ÚROVNÍ (5 vzdělávacích situací)
     ========================================================================== */

  const LEVELS = [
    {
      id: 1,
      title: 'Základní světelný okruh',
      subtitle: 'Pochopení cesty fáze L a nuláku N',
      goal: 'Zapojte světelný okruh přes hlavní vypínač a jistič B10.',
      desc: 'Fázový vodič (L) veďte z přívodu sítě přes hlavní vypínač a jistič B10 do svítidla. Nulový vodič (N) propojte z přívodu do hlavní N svorkovnice a odtud do svítidla.',
      hint: 'Fáze (hnědá): Přívod L -> Hlavní vypínač L_IN, pak z L_OUT -> Jistič B10 IN, a z OUT -> Svítidlo L. Nulák (modrá): Přívod N -> Hlavní svorkovnice N -> Svítidlo N.',
      eduTip: 'Fázový vodič musí vždy procházet vypínacími a jistícími prvky. Nulový vodič N slouží jako pracovní zpětný vodič a v běžných 1-fázových obvodech se obvykle nejistí.',
      visibleDevices: ['dev-feed', 'dev-main-switch', 'dev-mcb-10'],
      visibleBars: ['module-n-main-bar'],
      visibleAppliances: ['appliance-light'],
      hidePEOnLight: true,
      preWired: []
    },
    {
      id: 2,
      title: 'Ochranný vodič PE a kovové svítidlo',
      subtitle: 'Ochrana před nebezpečným dotykovým napětím (třída I)',
      goal: 'Zapojte kovové svítidlo včetně ochranného vodiče PE.',
      desc: 'Kovové svítidlo má vodivý kryt. Kromě fáze a nuláku připojte PE svorkovnici rozvaděče k přívodu PE a k ochranné svorce kostry svítidla.',
      hint: 'Nezapomeňte na PE (zelenožlutý): Propojte Přívod PE -> PE svorkovnice -> Svítidlo PE. Fázi a nulák zapojte stejně jako v 1. úrovni.',
      eduTip: 'Ochranný vodič PE spojuje kovové neživé části s uzemněním. Při vnitřní poruše izolace svede poruchový proud do země a způsobí okamžité vybavení jističe, čímž ochrání člověka před zásahem proudem.',
      visibleDevices: ['dev-feed', 'dev-main-switch', 'dev-mcb-10'],
      visibleBars: ['module-pe-bar', 'module-n-main-bar'],
      visibleAppliances: ['appliance-light'],
      hidePEOnLight: false,
      preWired: []
    },
    {
      id: 3,
      title: 'Zásuvkový okruh s proudovým chráničem (RCD)',
      subtitle: 'Ochrana zásuvek dle ČSN 33 2000-4-41',
      goal: 'Zapojte zásuvku 230V přes proudový chránič RCD (30 mA) a jistič B16.',
      desc: 'Běžné zásuvky v bytě musí být chráněny proudovým chráničem. Fáze i nulák musí procházet chráničem. Fázi z chrániče veďte do jističe B16 a odtud do zásuvky. PE zapojte z PE svorkovnice na kolík zásuvky.',
      hint: 'Fáze: Přívod L -> QS -> RCD L_IN -> RCD L_OUT -> Jistič B16 -> Zásuvka L. Nulák: Přívod N -> RCD N_IN -> RCD N_OUT -> Zásuvka N. PE: Přívod PE -> PE svorkovnice -> Zásuvka PE.',
      eduTip: 'Proudový chránič s vybavovacím proudem 30 mA odpojí obvod během 30 milisekund při úniku proudu. Chrání lidský život i v případě přímého dotyku fázového vodiče.',
      visibleDevices: ['dev-feed', 'dev-main-switch', 'dev-rcd', 'dev-mcb-16'],
      visibleBars: ['module-pe-bar'],
      visibleAppliances: ['appliance-socket'],
      preWired: []
    },
    {
      id: 4,
      title: 'Dva okruhy a oddělené N lišty',
      subtitle: 'Světla bez RCD vs. Zásuvka s RCD (typická chyba v praxi)',
      goal: 'Zapojte světelný okruh a chráněný zásuvkový okruh s oddělenými nuláky.',
      desc: 'Světlo zapojte mimo chránič (nulák do Hlavní N svorkovnice). Zásuvku zapojte přes RCD a jistič B16 (nulák do svorkovnice N za chráničem). Záměna N vodičů způsobí okamžité vybavení chrániče!',
      hint: 'Přívod N veďte do Hlavní N svorkovnice a do RCD N_IN. Z RCD N_OUT propojte svorkovnici N za chráničem. Svítidlo N -> Hlavní N lišta. Zásuvka N -> Lišta za chráničem.',
      eduTip: 'Proč chránič vybaví při špatném nuláku? Chránič je součtový transformátor. Pokud proud odteče fází přes chránič, ale vrátí se nulákem mimo chránič (nebo naopak), chránič vyhodnotí rozdíl jako únik proudu a okamžitě vypne.',
      visibleDevices: ['dev-feed', 'dev-main-switch', 'dev-rcd', 'dev-mcb-10', 'dev-mcb-16'],
      visibleBars: ['module-pe-bar', 'module-n-main-bar', 'module-n-rcd-bar'],
      visibleAppliances: ['appliance-light', 'appliance-socket'],
      preWired: []
    },
    {
      id: 5,
      title: 'Detektivní výzva: Oprava kutilova zapojení',
      subtitle: 'Nalezení a odstranění smrtelných chyb v instalaci',
      goal: 'Odstraňte nebezpečné zkraty a špatné zapojení bojleru a zapojte jej správně.',
      desc: 'Pozor! V rozvaděči je předem zapojeno nebezpečné amatérské schéma: fáze je spojena s kovovým pláštěm spotřebiče a jistič je vyřazen. Kliknutím na špatné vodiče je odpojte a zapojte okruh bezpečně.',
      hint: 'Stiskněte „Zapnout / Otestovat“ pro diagnostiku. Klikněte na vadné vodiče pro jejich smazání. Správně má být: Přívod L -> QS -> MCB16 -> Bojler L. Nulák -> Bojler N. PE lišta -> Bojler PE.',
      eduTip: 'V praxi se revizní technik často setkává s neodbornými úpravami „kutilů“. Spojení fáze na ochranný kolík je jedna z nejtragičtějších chyb, která končí smrtelným úrazem.',
      visibleDevices: ['dev-feed', 'dev-main-switch', 'dev-mcb-16'],
      visibleBars: ['module-pe-bar', 'module-n-main-bar'],
      visibleAppliances: ['appliance-boiler'],
      preWired: [
        { from: 'feed_l', to: 'boiler_pe', color: 'L' },  // Smrtelná chyba: fáze přímo na kostru!
        { from: 'feed_n', to: 'mcb16_in', color: 'N' },   // Nulák do jističe
        { from: 'mcb16_out', to: 'boiler_l', color: 'N' },
        { from: 'pe_bar_1', to: 'boiler_n', color: 'PE' } // PE do nuláku
      ]
    }
  ];

  /* ==========================================================================
     4. STAV HRY A GLOBÁLNÍ PROMĚNNÉ
     ========================================================================== */

  const GameState = {
    currentLevelIndex: 0,
    wires: [], // Pole objektů { id, from, to, color }
    selectedTerminal: null,
    selectedWireColor: 'auto', // 'auto' | 'L' | 'N' | 'PE'
    deviceStates: {
      qs: true,     // Hlavní vypínač sepnut
      rcd: true,    // Proudový chránič sepnut
      mcb10: true,  // Jistič B10 sepnut
      mcb16: true   // Jistič B16 sepnut
    },
    levelTimer: null,
    levelSeconds: 0,
    currentAttempts: 0,
    currentErrors: 0,
    levelPassed: false
  };

  /* ==========================================================================
     5. SIMULAČNÍ A KONTROLNÍ JÁDRO ELEKTRICKÉHO ROZVADĚČE
     ========================================================================== */

  const CircuitSimulator = {
    // Definice vnitřního propojení přístrojů při sepnutém stavu
    getInternalConnections() {
      const connections = [];

      // Hlavní vypínač QS (L_IN <-> L_OUT)
      if (GameState.deviceStates.qs) {
        connections.push(['qs_l_in', 'qs_l_out']);
      }

      // Proudový chránič RCD (L_IN <-> L_OUT, N_IN <-> N_OUT)
      if (GameState.deviceStates.rcd) {
        connections.push(['rcd_l_in', 'rcd_l_out']);
        connections.push(['rcd_n_in', 'rcd_n_out']);
      }

      // Jistič B10 (IN <-> OUT)
      if (GameState.deviceStates.mcb10) {
        connections.push(['mcb10_in', 'mcb10_out']);
      }

      // Jistič B16 (IN <-> OUT)
      if (GameState.deviceStates.mcb16) {
        connections.push(['mcb16_in', 'mcb16_out']);
      }

      // Společné propojení svorek na PE svorkovnici (všechny PE svorky na liště jsou spojeny)
      const peTerms = ['pe_bar_1', 'pe_bar_2', 'pe_bar_3', 'pe_bar_4'];
      for (let i = 0; i < peTerms.length - 1; i++) {
        connections.push([peTerms[i], peTerms[i + 1]]);
      }

      // Společné propojení svorek na Hlavní N svorkovnici
      const nMainTerms = ['n_main_1', 'n_main_2', 'n_main_3', 'n_main_4'];
      for (let i = 0; i < nMainTerms.length - 1; i++) {
        connections.push([nMainTerms[i], nMainTerms[i + 1]]);
      }

      // Společné propojení svorek na N svorkovnici za chráničem
      const nRcdTerms = ['n_rcd_1', 'n_rcd_2', 'n_rcd_3'];
      for (let i = 0; i < nRcdTerms.length - 1; i++) {
        connections.push([nRcdTerms[i], nRcdTerms[i + 1]]);
      }

      return connections;
    },

    // Sestavení grafu propojení svorek (vodiče + vnitřní kontakty)
    buildGraph(includeLoads = false) {
      const graph = {};

      const addEdge = (u, v) => {
        if (!graph[u]) graph[u] = new Set();
        if (!graph[v]) graph[v] = new Set();
        graph[u].add(v);
        graph[v].add(u);
      };

      // 1. Uživatelské vodiče
      GameState.wires.forEach(w => {
        addEdge(w.from, w.to);
      });

      // 2. Vnitřní kontakty přístrojů a můstků
      const internal = this.getInternalConnections();
      internal.forEach(([u, v]) => addEdge(u, v));

      // 3. Volitelně zátěže (vnitřní odpor svítidla / zátěže)
      if (includeLoads) {
        addEdge('light_l', 'light_n');
        addEdge('boiler_l', 'boiler_n');
      }

      return graph;
    },

    // Prohledání grafu do šířky (BFS) pro zjištění vodivého propojení dvou svorek
    isConnected(graph, startNode, targetNode) {
      if (!graph[startNode] || !graph[targetNode]) return false;
      if (startNode === targetNode) return true;

      const visited = new Set();
      const queue = [startNode];
      visited.add(startNode);

      while (queue.length > 0) {
        const curr = queue.shift();
        if (curr === targetNode) return true;

        const neighbors = graph[curr] || [];
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }

      return false;
    },

    // Nalezení všech uzlů dosažitelných z dané svorky
    getReachableNodes(graph, startNode) {
      if (!graph[startNode]) return new Set([startNode]);
      const visited = new Set([startNode]);
      const queue = [startNode];

      while (queue.length > 0) {
        const curr = queue.shift();
        const neighbors = graph[curr] || [];
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }
      return visited;
    },

    // Vyhodnocení obvodu a bezpečnostních pravidel
    evaluateCircuit(level) {
      const graphNoLoads = this.buildGraph(false);

      const reachableFromPhase = this.getReachableNodes(graphNoLoads, 'feed_l');

      // ----------------------------------------------------------------------
      // KONTROLA 1: KRITICKÝ ZKRAT (L spojené přímo s N bez zátěže)
      // ----------------------------------------------------------------------
      if (this.isConnected(graphNoLoads, 'feed_l', 'feed_n')) {
        return {
          status: 'error',
          type: 'short_ln',
          title: '💥 Tvrdý zkrat (Fáze L – Nulák N)!',
          message: 'Fázový vodič je přímo spojen s nulovým vodičem bez jakéhokoliv odporu zátěže! V reálu by došlo k masivnímu obloukovému záblesku, roztavení kontaktů a vybavení nadproudové ochrany.',
          multimeter: { voltage: 0, current: 99.9, diff: 0 }
        };
      }

      // ----------------------------------------------------------------------
      // KONTROLA 2: ZKRAT FÁZE NA OCHRANNÝ VODIČ PE
      // ----------------------------------------------------------------------
      if (this.isConnected(graphNoLoads, 'feed_l', 'feed_pe')) {
        return {
          status: 'error',
          type: 'short_lpe',
          title: '⚠️ Zkrat na ochranný vodič (L – PE)!',
          message: 'Fázové napětí je přímo přivedeno do ochranného uzemnění PE. Okamžitě by vybavil proudový chránič nebo hlavní jistič.',
          multimeter: { voltage: 0, current: 80.0, diff: 80000 }
        };
      }

      // ----------------------------------------------------------------------
      // KONTROLA 3: SMRTELNÉ NEBEZPEČÍ: FÁZE NA KOSTROVÉ SVORCE SPOTŘEBIČE
      // ----------------------------------------------------------------------
      const appliancesPE = ['light_pe', 'socket_pe', 'boiler_pe'];
      for (const peTerm of appliancesPE) {
        if (reachableFromPhase.has(peTerm)) {
          return {
            status: 'error',
            type: 'phase_on_chassis',
            title: '☠️ ŽIVOTU NEBEZPEČNÉ: Fáze 230V na kostře!',
            message: 'Fázový vodič 230 V je přiveden na kovový kryt (kostru) spotřebiče nebo ochranný kolík! Kdokoliv by se spotřebiče dotkl, utrpěl by okamžitý těžký či smrtelný úraz elektrickým proudem!',
            multimeter: { voltage: 230, current: 0, diff: 0 }
          };
        }
      }

      // ----------------------------------------------------------------------
      // KONTROLA 4: STAV HLAVNÍHO VYPÍNAČE
      // ----------------------------------------------------------------------
      if (!GameState.deviceStates.qs) {
        return {
          status: 'warning',
          type: 'switch_off',
          title: 'Hlavní vypínač je vypnutý (stav O)',
          message: 'Rozvaděč je bez napětí. Klikněte na červenou páčku hlavního vypínače a sepněte jej do polohy I.',
          multimeter: { voltage: 0, current: 0, diff: 0 }
        };
      }

      // ----------------------------------------------------------------------
      // KONTROLA 5: KONTROLA BAREVNÉHO ZNAČENÍ DLE ČSN EN 60446
      // ----------------------------------------------------------------------
      for (const wire of GameState.wires) {
        // Kontrola: Zelenožlutý vodič nesmí vést fázi
        if (wire.color === 'PE') {
          if (reachableFromPhase.has(wire.from) || reachableFromPhase.has(wire.to)) {
            return {
              status: 'error',
              type: 'color_violation_pe',
              title: '❌ Porušení norem: Zelenožlutý vodič na fázi!',
              message: 'Podle normy ČSN EN 60446 se ochranný zelenožlutý vodič (PE) NIKDY a za ŽÁDNÝCH OKOLNOSTÍ nesmí použít jako fázový vodič pod napětím! Hrozí, že jiný elektrikář bude vodič považovat za bezpečný.',
              multimeter: { voltage: 230, current: 0, diff: 0 }
            };
          }
        }
        // Kontrola: Fázový hnědý vodič nesmí být zapojen přímo jako ochranný PE
        if (wire.color === 'L' && (wire.from === 'feed_pe' || wire.to === 'feed_pe')) {
          return {
            status: 'error',
            type: 'color_violation_l',
            title: '❌ Porušení norem: Hnědý vodič na PE přívodu!',
            message: 'Pro ochranné pospojování a přívod PE použijte výhradně zelenožlutý vodič.',
            multimeter: { voltage: 0, current: 0, diff: 0 }
          };
        }
      }

      // ----------------------------------------------------------------------
      // SPECIFICKÉ VYHODNOCENÍ PRO JEDNOTLIVÉ ÚROVNĚ
      // ----------------------------------------------------------------------

      if (level.id === 1) {
        const lightPhaseConnected = this.isConnected(graphNoLoads, 'feed_l', 'light_l');
        const lightNeutralConnected = this.isConnected(graphNoLoads, 'feed_n', 'light_n');

        const throughQS = this.isConnected(graphNoLoads, 'feed_l', 'qs_l_in') &&
                          this.isConnected(graphNoLoads, 'qs_l_out', 'mcb10_in');
        const throughMCB = this.isConnected(graphNoLoads, 'mcb10_out', 'light_l');

        if (!throughQS && lightPhaseConnected) {
          return {
            status: 'warning',
            type: 'bypass_qs',
            title: 'Chyba: Světlo obchází hlavní vypínač!',
            message: 'Rozvaděč musí umožnit centrální odpojení všech okruhů hlavním vypínačem. Zapojte fázi přes svorky L_IN a L_OUT hlavního vypínače.',
            multimeter: { voltage: 230, current: 0, diff: 0 }
          };
        }

        if (!throughMCB && lightPhaseConnected) {
          return {
            status: 'error',
            type: 'no_mcb',
            title: 'Nejištěný okruh: Chybí jistič B10!',
            message: 'Fázový vodič vede do světla přímo bez jističe! Při poruše nebo přetížení by se roztavily kabely a došlo by k požáru.',
            multimeter: { voltage: 230, current: 0, diff: 0 }
          };
        }

        if (!lightPhaseConnected) {
          return {
            status: 'warning',
            type: 'missing_l',
            title: 'Světlo nesvítí: Chybí fázové napětí (L)',
            message: 'Zkontrolujte cestu fáze: Přívod L -> Hlavní vypínač -> Jistič B10 -> Svítidlo L.',
            multimeter: { voltage: 0, current: 0, diff: 0 }
          };
        }

        if (!lightNeutralConnected) {
          return {
            status: 'warning',
            type: 'missing_n',
            title: 'Obvod není uzavřen: Chybí nulový vodič (N)',
            message: 'Světlo potřebuje zpětný nulový vodič. Propojte Přívod N s Hlavní svorkovnicí N a z ní veďte vodič do svorky Svítidlo N.',
            multimeter: { voltage: 230, current: 0, diff: 0 }
          };
        }

        return {
          status: 'success',
          title: 'Úspěch! Světelný okruh bezpečně svítí.',
          message: 'Správně zapojená fáze přes jistič B10 a nulák přes hlavní N svorkovnici. Žárovka má stabilní napájení 230 V.',
          appliancesActive: { light: true },
          multimeter: { voltage: 230, current: 0.43, diff: 0 }
        };
      }

      if (level.id === 2) {
        const lightPhaseOk = this.isConnected(graphNoLoads, 'feed_l', 'light_l');
        const lightNeutralOk = this.isConnected(graphNoLoads, 'feed_n', 'light_n');
        const peBarConnected = this.isConnected(graphNoLoads, 'feed_pe', 'pe_bar_1') ||
                               this.isConnected(graphNoLoads, 'feed_pe', 'pe_bar_2') ||
                               this.isConnected(graphNoLoads, 'feed_pe', 'pe_bar_3') ||
                               this.isConnected(graphNoLoads, 'feed_pe', 'pe_bar_4');
        const lightPeConnected = this.isConnected(graphNoLoads, 'feed_pe', 'light_pe');

        if (!lightPhaseOk || !lightNeutralOk) {
          return {
            status: 'warning',
            type: 'missing_power',
            title: 'Světlo nesvítí: Zkontrolujte zapojení L a N',
            message: 'Ujistěte se, že fáze prochází přes vypínač a jistič B10 a nulák je zapojen přes N svorkovnici.',
            multimeter: { voltage: 0, current: 0, diff: 0 }
          };
        }

        if (!peBarConnected) {
          return {
            status: 'warning',
            type: 'missing_pe_feed',
            title: 'PE svorkovnice není uzemněna!',
            message: 'Nezapomeňte propojit Přívod PE ze sítě na svorkovnici PE.',
            multimeter: { voltage: 230, current: 0.43, diff: 0 }
          };
        }

        if (!lightPeConnected) {
          return {
            status: 'error',
            type: 'missing_appliance_pe',
            title: '⚠️ Nebezpečí dotyku: Kovové svítidlo bez PE!',
            message: 'Svítidlo třídy I má kovový plášť! Norma ČSN 33 2000-4-41 přísně vyžaduje připojení ochranného vodiče PE na kostru. Propojte PE svorkovnici s ochrannou svorkou svítidla.',
            multimeter: { voltage: 230, current: 0.43, diff: 0 }
          };
        }

        return {
          status: 'success',
          title: 'Perfektní! Kovové svítidlo je bezpečně chráněno.',
          message: 'Svítidlo svítí a jeho kovový kryt je spolehlivě pospojován s ochranným vodičem PE.',
          appliancesActive: { light: true },
          multimeter: { voltage: 230, current: 0.43, diff: 0 }
        };
      }

      if (level.id === 3) {
        const socketLConnected = this.isConnected(graphNoLoads, 'feed_l', 'socket_l');
        const socketNConnected = this.isConnected(graphNoLoads, 'feed_n', 'socket_n');
        const socketPEConnected = this.isConnected(graphNoLoads, 'feed_pe', 'socket_pe');

        const lThroughRcd = this.isConnected(graphNoLoads, 'feed_l', 'rcd_l_in') &&
                            this.isConnected(graphNoLoads, 'rcd_l_out', 'mcb16_in') &&
                            this.isConnected(graphNoLoads, 'mcb16_out', 'socket_l');

        const nThroughRcd = this.isConnected(graphNoLoads, 'feed_n', 'rcd_n_in') &&
                            this.isConnected(graphNoLoads, 'rcd_n_out', 'socket_n');

        const nFromBeforeRcd = this.isConnected(graphNoLoads, 'feed_n', 'socket_n') && !nThroughRcd;

        if (lThroughRcd && nFromBeforeRcd) {
          return {
            status: 'error',
            type: 'rcd_trip_mismatched_n',
            title: '⚡ CHRÁNIČ RCD OKAMŽITĚ VYBAVIL!',
            message: 'Nulový vodič zásuvky byl připojen před proudový chránič (na přívod nebo hlavní N můstek)! Chránič detekoval nerovnováhu proudů mezi L a N a okamžitě okruh odpojil. Nulák chráněného okruhu MUSÍ jít ze svorky RCD N_OUT!',
            multimeter: { voltage: 0, current: 0, diff: 1600 }
          };
        }

        if (!lThroughRcd && socketLConnected) {
          return {
            status: 'error',
            type: 'socket_no_rcd',
            title: 'Zásuvka není chráněna chráničem RCD!',
            message: 'Dle normy ČSN 33 2000-4-41 musí být všechny zásuvky do 32A pro laickou obsluhu vybaveny doplňkovou ochranou proudovým chráničem 30 mA. Zapojte fázi i nulák přes RCD.',
            multimeter: { voltage: 230, current: 0, diff: 0 }
          };
        }

        if (!this.isConnected(graphNoLoads, 'mcb16_out', 'socket_l')) {
          return {
            status: 'error',
            type: 'socket_no_mcb',
            title: 'Zásuvka není jištěna jističem B16!',
            message: 'Zásuvkový okruh s průřezem vodičů 2.5 mm² musí být jištěn jističem 16A (MCB B16). Fázi z RCD L_OUT přiveďte do jističe B16 a odtud do zásuvky.',
            multimeter: { voltage: 0, current: 0, diff: 0 }
          };
        }

        if (!socketPEConnected) {
          return {
            status: 'error',
            type: 'socket_no_pe',
            title: '⚠️ Zásuvka nemá připojený kolík PE!',
            message: 'Ochranný kolík zásuvky musí být spojen se svorkovnicí PE. Spotřebiče připojené do neuzemněné zásuvky představují riziko úrazu.',
            multimeter: { voltage: 230, current: 0, diff: 0 }
          };
        }

        if (!socketNConnected) {
          return {
            status: 'warning',
            type: 'socket_no_n',
            title: 'Zásuvka nemá nulový vodič N',
            message: 'Připojte nulový vodič z výstupu chrániče (RCD N_OUT) do pravé svorky zásuvky N.',
            multimeter: { voltage: 230, current: 0, diff: 0 }
          };
        }

        return {
          status: 'success',
          title: 'Výborně! Zásuvkový okruh s RCD je plně funkční.',
          message: 'Zásuvka je správně zapojena: L vlevo přes jistič B16 za chráničem, N vpravo za chráničem, PE nahoře na kolíku.',
          appliancesActive: { socket: true },
          multimeter: { voltage: 230, current: 2.15, diff: 0 }
        };
      }

      if (level.id === 4) {
        const lightPhaseOk = this.isConnected(graphNoLoads, 'mcb10_out', 'light_l');
        const lightThroughRcd = this.isConnected(graphNoLoads, 'rcd_l_out', 'mcb10_in');
        const lightNOnMainBar = this.isConnected(graphNoLoads, 'n_main_1', 'light_n') ||
                                this.isConnected(graphNoLoads, 'n_main_2', 'light_n') ||
                                this.isConnected(graphNoLoads, 'n_main_3', 'light_n') ||
                                this.isConnected(graphNoLoads, 'n_main_4', 'light_n');
        const lightNOnRcdBar = this.isConnected(graphNoLoads, 'n_rcd_1', 'light_n') ||
                               this.isConnected(graphNoLoads, 'n_rcd_2', 'light_n') ||
                               this.isConnected(graphNoLoads, 'n_rcd_3', 'light_n');

        const socketPhaseThroughRcd = this.isConnected(graphNoLoads, 'rcd_l_out', 'mcb16_in') &&
                                     this.isConnected(graphNoLoads, 'mcb16_out', 'socket_l');
        const socketNOnRcdBar = this.isConnected(graphNoLoads, 'n_rcd_1', 'socket_n') ||
                                this.isConnected(graphNoLoads, 'n_rcd_2', 'socket_n') ||
                                this.isConnected(graphNoLoads, 'n_rcd_3', 'socket_n') ||
                                this.isConnected(graphNoLoads, 'rcd_n_out', 'socket_n');
        const socketNOnMainBar = this.isConnected(graphNoLoads, 'n_main_1', 'socket_n') ||
                                 this.isConnected(graphNoLoads, 'n_main_2', 'socket_n') ||
                                 this.isConnected(graphNoLoads, 'n_main_3', 'socket_n') ||
                                 this.isConnected(graphNoLoads, 'n_main_4', 'socket_n');

        const rcdBarFed = this.isConnected(graphNoLoads, 'rcd_n_out', 'n_rcd_1') ||
                          this.isConnected(graphNoLoads, 'rcd_n_out', 'n_rcd_2') ||
                          this.isConnected(graphNoLoads, 'rcd_n_out', 'n_rcd_3');

        if (socketPhaseThroughRcd && socketNOnMainBar) {
          return {
            status: 'error',
            type: 'rcd_trip_socket_n',
            title: '⚡ RCD VYBAVIL: Zásuvkový nulák na hlavní liště!',
            message: 'Zásuvka bere fázi z chrániče, ale její nulový vodič byl zapojen do hlavní nechráněné N svorkovnice. Vznikl proudový rozdíl a chránič vybavil. Nulák zásuvky zapojte na svorkovnici N za chráničem!',
            multimeter: { voltage: 0, current: 0, diff: 2150 }
          };
        }

        if (!lightThroughRcd && lightNOnRcdBar) {
          return {
            status: 'error',
            type: 'rcd_trip_light_n',
            title: '⚡ RCD VYBAVIL: Světelný nulák za chráničem!',
            message: 'Světelný okruh není napájen z chrániče, ale jeho nulák jste zapojili do svorkovnice za chráničem. Proud ze světla protéká přes chránič zpět, aniž by jím přitekl fází -> okamžité vybavení RCD!',
            multimeter: { voltage: 0, current: 0, diff: 430 }
          };
        }

        if (socketNOnRcdBar && !rcdBarFed && !this.isConnected(graphNoLoads, 'rcd_n_out', 'socket_n')) {
          return {
            status: 'warning',
            type: 'rcd_bar_unfed',
            title: 'Svorkovnice N za chráničem není připojena k RCD',
            message: 'Propojte svorku RCD N_OUT s kteroukoli svorkou na svorkovnici N za chráničem.',
            multimeter: { voltage: 230, current: 0, diff: 0 }
          };
        }

        if (!lightPhaseOk || !lightNOnMainBar) {
          return {
            status: 'warning',
            type: 'light_incomplete',
            title: 'Světelný okruh není správně zapojen',
            message: 'Světlo musí jít z hlavního přívodu přes QS -> Jistič B10 -> Svítidlo L. Nulák zapojte na Hlavní N svorkovnici.',
            multimeter: { voltage: 0, current: 0, diff: 0 }
          };
        }

        if (!socketPhaseThroughRcd || (!socketNOnRcdBar && !this.isConnected(graphNoLoads, 'rcd_n_out', 'socket_n'))) {
          return {
            status: 'warning',
            type: 'socket_incomplete',
            title: 'Zásuvkový okruh není kompletní',
            message: 'Zásuvka vyžaduje fázi z výstupu RCD přes jistič B16 a nulák ze svorkovnice za chráničem.',
            multimeter: { voltage: 230, current: 0.43, diff: 0 }
          };
        }

        const lightPeOk = this.isConnected(graphNoLoads, 'feed_pe', 'light_pe');
        const socketPeOk = this.isConnected(graphNoLoads, 'feed_pe', 'socket_pe');
        if (!lightPeOk || !socketPeOk) {
          return {
            status: 'error',
            type: 'missing_pe_dual',
            title: 'Chybí ochranné pospojování PE!',
            message: 'Oba spotřebiče musí mít ochrannou svorku PE spojenou se svorkovnicí PE.',
            multimeter: { voltage: 230, current: 2.58, diff: 0 }
          };
        }

        return {
          status: 'success',
          title: 'Skvělá práce! Oddělení N svorkovnic zvládnuto.',
          message: 'Pochopili jste zásadní pravidlo rozvaděčů: Chráněné okruhy musí mít striktně oddělené N lišty od nechráněných obvodů. Vše funguje bez chyb.',
          appliancesActive: { light: true, socket: true },
          multimeter: { voltage: 230, current: 2.58, diff: 0 }
        };
      }

      if (level.id === 5) {
        const boilerLOk = this.isConnected(graphNoLoads, 'feed_l', 'boiler_l');
        const boilerNOk = this.isConnected(graphNoLoads, 'feed_n', 'boiler_n');
        const boilerPEOk = this.isConnected(graphNoLoads, 'feed_pe', 'boiler_pe');
        const boilerThroughMCB = this.isConnected(graphNoLoads, 'feed_l', 'qs_l_in') &&
                                 this.isConnected(graphNoLoads, 'qs_l_out', 'mcb16_in') &&
                                 this.isConnected(graphNoLoads, 'mcb16_out', 'boiler_l');

        if (!boilerThroughMCB) {
          return {
            status: 'warning',
            type: 'boiler_no_mcb',
            title: 'Bojler musí být jištěn jističem B16!',
            message: 'Zkontrolujte cestu fáze: Přívod L -> Hlavní vypínač -> Jistič B16 -> Bojler L.',
            multimeter: { voltage: 0, current: 0, diff: 0 }
          };
        }

        if (!boilerNOk) {
          return {
            status: 'warning',
            type: 'boiler_no_n',
            title: 'Bojleru chybí nulový vodič N',
            message: 'Propojte svorku Bojler N na Hlavní svorkovnici N.',
            multimeter: { voltage: 230, current: 0, diff: 0 }
          };
        }

        if (!boilerPEOk) {
          return {
            status: 'error',
            type: 'boiler_no_pe',
            title: '⚠️ Závažná chyba: Kovový bojler bez PE!',
            message: 'Bojler je plný vody a má kovový plášť. Uzemnění kostry PE je zde životně důležité. Připojte Bojler PE na svorkovnici PE.',
            multimeter: { voltage: 230, current: 0, diff: 0 }
          };
        }

        return {
          status: 'success',
          title: 'Bravo! Bojler je bezpečně opraven a hřeje.',
          message: 'Odstranili jste všechny smrtelné kutilské nástrahy. Obvod je řádně jištěn jističem 16A a kovový plášť je bezpečně uzemněn.',
          appliancesActive: { boiler: true },
          multimeter: { voltage: 230, current: 9.57, diff: 0 }
        };
      }

      return {
        status: 'warning',
        title: 'Obvod není dokončen',
        message: 'Propojte všechny požadované komponenty dle zadání.',
        multimeter: { voltage: 0, current: 0, diff: 0 }
      };
    }
  };

  /* ==========================================================================
     6. GRAFICKÉ ROZHRANÍ A KRESLENÍ VODIČŮ (SVG)
     ========================================================================== */

  const UIController = {
    containerEl: null,
    svgEl: null,
    wiresLayerEl: null,
    tempWireEl: null,

    init() {
      this.containerEl = document.getElementById('board-container');
      this.svgEl = document.getElementById('wires-svg');
      this.wiresLayerEl = document.getElementById('wires-layer');
      this.tempWireEl = document.getElementById('temp-wire-path');

      SoundEngine.init();
      this.bindEvents();
      this.loadLevel(0);
      this.startTimer();
      this.updateStatsUI();
    },

    // Aktualizace rozměrů SVG plátna dle celkového scrollu kontejneru
    updateSvgDimensions() {
      if (!this.svgEl || !this.containerEl) return;
      const w = Math.max(this.containerEl.scrollWidth, this.containerEl.clientWidth);
      const h = Math.max(this.containerEl.scrollHeight, this.containerEl.clientHeight);
      this.svgEl.style.width = w + 'px';
      this.svgEl.style.height = h + 'px';
      this.svgEl.setAttribute('width', w);
      this.svgEl.setAttribute('height', h);
    },

    // Výpočet středu svorky vzhledem k plátnu rozvaděče
    getTerminalCenter(terminalId) {
      const termEl = document.querySelector(`.terminal[data-id="${terminalId}"]`);
      if (!termEl || !this.containerEl) return { x: 0, y: 0 };

      const termRect = termEl.getBoundingClientRect();
      const contRect = this.containerEl.getBoundingClientRect();

      return {
        x: termRect.left + termRect.width / 2 - contRect.left + this.containerEl.scrollLeft,
        y: termRect.top + termRect.height / 2 - contRect.top + this.containerEl.scrollTop
      };
    },

    // Generování hladké kubické Bézierovy křivky pro realistický ohyb vodiče
    generateWirePathD(p1, p2) {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Přirozený průvěs a zaoblení vodiče
      const curvature = Math.min(Math.max(dist * 0.35, 30), 120);

      const cp1y = p1.y + (dy > 0 ? curvature : -curvature);
      const cp2y = p2.y - (dy > 0 ? curvature : -curvature);

      return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} C ${p1.x.toFixed(1)} ${cp1y.toFixed(1)}, ${p2.x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    },

    // Překreslení všech vodičů na plátně
    renderWires() {
      if (!this.wiresLayerEl) return;
      this.updateSvgDimensions();
      this.wiresLayerEl.innerHTML = '';

      GameState.wires.forEach(wire => {
        const p1 = this.getTerminalCenter(wire.from);
        const p2 = this.getTerminalCenter(wire.to);

        if (p1.x === 0 && p1.y === 0) return;
        if (p2.x === 0 && p2.y === 0) return;

        const pathData = this.generateWirePathD(p1, p2);

        // Skupina pro vodič (obsahuje neviditelnou širší stopu pro snadné kliknutí)
        const groupEl = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        groupEl.setAttribute('class', 'wire-group');
        groupEl.style.cursor = 'pointer';

        // 1. Neviditelná tlustá stopa pro snadný zásah myší/prstem (hitbox 16px)
        const hitPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        hitPath.setAttribute('d', pathData);
        hitPath.setAttribute('fill', 'none');
        hitPath.setAttribute('stroke', 'transparent');
        hitPath.setAttribute('stroke-width', '18');
        hitPath.setAttribute('stroke-linecap', 'round');
        hitPath.style.pointerEvents = 'stroke';

        // 2. Viditelná grafická stopa vodiče
        const visPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        visPath.setAttribute('d', pathData);
        visPath.setAttribute('class', `wire-path wire-${wire.color}`);
        visPath.setAttribute('data-wire-id', wire.id);

        groupEl.appendChild(hitPath);
        groupEl.appendChild(visPath);

        // U zelenožlutého vodiče PE přidáme ještě kontrastní žluté pruhování pro 100% spolehlivost
        if (wire.color === 'PE') {
          visPath.style.stroke = '#2e7d32'; // Zelený podklad
          const stripePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          stripePath.setAttribute('d', pathData);
          stripePath.setAttribute('fill', 'none');
          stripePath.setAttribute('stroke', '#ffd600'); // Žluté pruhy
          stripePath.setAttribute('stroke-width', '6');
          stripePath.setAttribute('stroke-dasharray', '14 14');
          stripePath.setAttribute('stroke-linecap', 'round');
          stripePath.style.pointerEvents = 'none';
          groupEl.appendChild(stripePath);
        }

        // Nápovědní popisek pro odstranění vodiče
        const titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        titleEl.textContent = `Vodič ${wire.color}: Kliknutím odpojit`;
        groupEl.appendChild(titleEl);

        // Kliknutím na vodič se vodič smaže
        groupEl.addEventListener('click', (e) => {
          e.stopPropagation();
          if (GameState.selectedTerminal) {
            this.clearTerminalSelection();
          }
          this.removeWire(wire.id);
        });

        this.wiresLayerEl.appendChild(groupEl);
      });
    },

    // Přidání nového vodiče
    addWire(fromId, toId) {
      if (fromId === toId) return;

      // Zkontrolovat, zda již takové propojení neexistuje
      const alreadyConnected = GameState.wires.some(w =>
        (w.from === fromId && w.to === toId) || (w.from === toId && w.to === fromId)
      );

      if (alreadyConnected) {
        this.showToast('Tyto svorky jsou již přímo propojeny!', 'warning');
        return;
      }

      // Určení barvy vodiče
      let chosenColor = GameState.selectedWireColor;
      if (chosenColor === 'auto') {
        const fromEl = document.querySelector(`.terminal[data-id="${fromId}"]`);
        const toEl = document.querySelector(`.terminal[data-id="${toId}"]`);
        const fromType = fromEl ? fromEl.dataset.type : '';
        const toType = toEl ? toEl.dataset.type : '';

        if (fromType === 'PE' || fromType === 'SUPPLY_PE' || toType === 'PE' || toType === 'SUPPLY_PE') {
          chosenColor = 'PE';
        } else if (fromType === 'N' || fromType === 'SUPPLY_N' || toType === 'N' || toType === 'SUPPLY_N') {
          chosenColor = 'N';
        } else {
          chosenColor = 'L';
        }
      }

      const newWire = {
        id: 'wire_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        from: fromId,
        to: toId,
        color: chosenColor
      };

      GameState.wires.push(newWire);
      SoundEngine.playConnect();
      this.renderWires();
      this.resetConsoleStatus();
    },

    // Odstranění konkrétního vodiče
    removeWire(wireId) {
      const idx = GameState.wires.findIndex(w => w.id === wireId);
      if (idx !== -1) {
        GameState.wires.splice(idx, 1);
        SoundEngine.playDisconnect();
        this.renderWires();
        this.resetConsoleStatus();
      }
    },

    // Krok zpět: odstraní naposledy přidaný vodič
    undoLastWire() {
      if (GameState.wires.length > 0) {
        GameState.wires.pop();
        SoundEngine.playDisconnect();
        this.renderWires();
        this.resetConsoleStatus();
      }
    },

    // Smazání všech vodičů aktuální úrovně
    clearAllWires() {
      if (GameState.wires.length === 0) return;
      if (confirm('Opravdu chcete smazat všechny zapojené vodiče v této úrovni?')) {
        GameState.wires = [];
        SoundEngine.playDisconnect();
        this.renderWires();
        this.resetConsoleStatus();
      }
    },

    // Výběr svorky kliknutím
    handleTerminalClick(termEl) {
      const termId = termEl.dataset.id;

      if (!GameState.selectedTerminal) {
        // 1. První svorka vybrána
        GameState.selectedTerminal = termId;
        termEl.classList.add('selected');
        this.tempWireEl.classList.remove('hidden');
        SoundEngine.playConnect();
      } else if (GameState.selectedTerminal === termId) {
        // Kliknuto na stejnou svorku -> zrušit výběr
        this.clearTerminalSelection();
      } else {
        // 2. Druhá svorka vybrána -> vytvořit propojení
        const firstTermId = GameState.selectedTerminal;
        this.clearTerminalSelection();
        this.addWire(firstTermId, termId);
      }
    },

    // Zrušení výběru svorky
    clearTerminalSelection() {
      if (GameState.selectedTerminal) {
        const prevSelected = document.querySelector(`.terminal[data-id="${GameState.selectedTerminal}"]`);
        if (prevSelected) prevSelected.classList.remove('selected');
      }
      GameState.selectedTerminal = null;
      if (this.tempWireEl) this.tempWireEl.classList.add('hidden');
    },

    // Aktualizace vodicí gumové čáry při pohybu myši
    handleMouseMove(e) {
      if (!GameState.selectedTerminal || !this.containerEl || !this.tempWireEl) return;

      const p1 = this.getTerminalCenter(GameState.selectedTerminal);
      const contRect = this.containerEl.getBoundingClientRect();
      const p2 = {
        x: e.clientX - contRect.left + this.containerEl.scrollLeft,
        y: e.clientY - contRect.top + this.containerEl.scrollTop
      };

      const pathData = this.generateWirePathD(p1, p2);
      this.tempWireEl.setAttribute('d', pathData);
    },

    // Načtení konkrétní úrovně
    loadLevel(levelIndex) {
      GameState.currentLevelIndex = levelIndex;
      const level = LEVELS[levelIndex];
      GameState.levelPassed = false;
      GameState.currentAttempts = 0;
      GameState.currentErrors = 0;
      GameState.levelSeconds = 0;

      // Vyčistit předchozí vodiče a výběry
      this.clearTerminalSelection();
      GameState.wires = [];

      // Pokud má úroveň předvyplněné vodiče (úroveň 5), naklonovat je
      if (level.preWired && level.preWired.length > 0) {
        level.preWired.forEach((w, idx) => {
          GameState.wires.push({
            id: 'prewired_' + idx,
            from: w.from,
            to: w.to,
            color: w.color
          });
        });
      }

      // Aktualizace textů v hlavičce a zadání
      document.getElementById('level-badge').textContent = `Úroveň ${level.id} / ${LEVELS.length}`;
      document.getElementById('level-title').textContent = level.title;
      document.getElementById('task-goal-text').textContent = level.goal;
      document.getElementById('task-desc-text').textContent = level.desc;
      document.getElementById('hint-text').textContent = level.hint;
      document.getElementById('level-attempts').textContent = '0';
      document.getElementById('btn-next-level').classList.add('hidden');
      document.getElementById('hint-panel').classList.add('hidden');

      // Řízení viditelnosti modulů na DIN liště
      const allDevices = ['dev-feed', 'dev-main-switch', 'dev-rcd', 'dev-mcb-10', 'dev-mcb-16'];
      allDevices.forEach(devId => {
        const el = document.getElementById(devId);
        if (el) {
          if (level.visibleDevices.includes(devId)) {
            el.classList.remove('hidden');
          } else {
            el.classList.add('hidden');
          }
        }
      });

      // Řízení viditelnosti svorkovnic (můstků)
      const allBars = ['module-pe-bar', 'module-n-main-bar', 'module-n-rcd-bar'];
      allBars.forEach(barId => {
        const el = document.getElementById(barId);
        if (el) {
          if (level.visibleBars.includes(barId)) {
            el.classList.remove('hidden');
          } else {
            el.classList.add('hidden');
          }
        }
      });

      // Řízení viditelnosti spotřebičů
      const allAppliances = ['appliance-light', 'appliance-socket', 'appliance-boiler'];
      allAppliances.forEach(appId => {
        const el = document.getElementById(appId);
        if (el) {
          if (level.visibleAppliances.includes(appId)) {
            el.classList.remove('hidden');
          } else {
            el.classList.add('hidden');
          }
        }
      });

      // Nastavení PE svorky na svítidle
      const lightPeBox = document.getElementById('term-box-light-pe');
      const lightClassLabel = document.getElementById('light-class-label');
      if (lightPeBox) {
        if (level.hidePEOnLight) {
          lightPeBox.classList.add('hidden');
          if (lightClassLabel) lightClassLabel.textContent = 'Dvojitá izolace (Třída II)';
        } else {
          lightPeBox.classList.remove('hidden');
          if (lightClassLabel) lightClassLabel.textContent = 'Kovový kryt (Třída I)';
        }
      }

      // Reset stavu spotřebičů a multimetru
      this.resetAppliancesVisual();
      this.resetConsoleStatus();

      // Vykreslit po krátké prodlevě pro správné změření rozměrů v DOM
      setTimeout(() => {
        this.renderWires();
      }, 50);
    },

    // Reset vizuálního stavu zátěže (žárovka, zásuvka, bojler)
    resetAppliancesVisual() {
      const bulb = document.getElementById('lamp-bulb-visual');
      if (bulb) bulb.classList.remove('active');
      const lightText = document.getElementById('light-state-text');
      if (lightText) {
        lightText.textContent = 'Nesvítí';
        lightText.classList.remove('active');
      }

      const socketLed = document.getElementById('socket-tester-led');
      if (socketLed) {
        socketLed.className = 'socket-led';
      }
      const socketText = document.getElementById('socket-state-text');
      if (socketText) {
        socketText.textContent = 'Bez napětí';
        socketText.classList.remove('active');
      }

      const boilerTank = document.getElementById('boiler-tank-visual');
      if (boilerTank) boilerTank.classList.remove('active');
      const boilerText = document.getElementById('boiler-state-text');
      if (boilerText) {
        boilerText.textContent = 'Vypnuto';
        boilerText.classList.remove('active');
      }

      const summaryBadge = document.getElementById('appliances-summary-badge');
      if (summaryBadge) {
        summaryBadge.textContent = 'Vypnuto';
        summaryBadge.className = 'status-badge';
      }

      this.updateMultimeter(0, 0, 0);
    },

    // Aktualizace hodnot na digitálním multimetru
    updateMultimeter(voltage, current, diffMa) {
      document.getElementById('meter-voltage').textContent = `${voltage.toFixed(0)} V`;
      document.getElementById('meter-current').textContent = `${current.toFixed(2)} A`;
      document.getElementById('meter-diff').textContent = `${diffMa.toFixed(0)} mA`;
    },

    // Reset stavové hlášky
    resetConsoleStatus() {
      const consoleEl = document.getElementById('status-console');
      consoleEl.className = 'status-console';
      document.getElementById('console-status-icon').textContent = '⚪';
      document.getElementById('console-status-title').textContent = 'Připraveno k testu';
      document.getElementById('console-status-desc').textContent = 'Propojte svorky vodiči a stiskněte tlačítko „Zapnout / Otestovat“.';
      this.resetAppliancesVisual();
    },

    // Zobrazení toast notifikace
    showToast(message, type = 'info') {
      const consoleEl = document.getElementById('status-console');
      consoleEl.className = `status-console status-${type}`;
      document.getElementById('console-status-title').textContent = message;
    },

    // Otestování a spuštění simulace
    runSimulation() {
      const currentLevel = LEVELS[GameState.currentLevelIndex];
      GameState.currentAttempts++;
      document.getElementById('level-attempts').textContent = GameState.currentAttempts;

      const result = CircuitSimulator.evaluateCircuit(currentLevel);
      const isError = result.status === 'error' || result.status === 'warning';

      if (isError) {
        GameState.currentErrors++;
      }

      // Záznam pokusu do úložiště
      StorageManager.recordAttempt(currentLevel.id, isError);
      this.updateStatsUI();

      // Aktualizace multimetru
      if (result.multimeter) {
        this.updateMultimeter(result.multimeter.voltage, result.multimeter.current, result.multimeter.diff);
      }

      // Aktualizace konzole
      const consoleEl = document.getElementById('status-console');
      const iconEl = document.getElementById('console-status-icon');
      const titleEl = document.getElementById('console-status-title');
      const descEl = document.getElementById('console-status-desc');

      if (result.status === 'success') {
        SoundEngine.playSuccess();
        consoleEl.className = 'status-console status-success';
        iconEl.textContent = '🟢';
        titleEl.textContent = result.title;
        descEl.textContent = result.message;

        // Aktivace vizuálu zátěže
        if (result.appliancesActive) {
          if (result.appliancesActive.light) {
            document.getElementById('lamp-bulb-visual').classList.add('active');
            const lt = document.getElementById('light-state-text');
            lt.textContent = 'Svítí (230 V)';
            lt.classList.add('active');
          }
          if (result.appliancesActive.socket) {
            const sled = document.getElementById('socket-tester-led');
            sled.className = 'socket-led active';
            const st = document.getElementById('socket-state-text');
            st.textContent = 'Aktivní (OK)';
            st.classList.add('active');
          }
          if (result.appliancesActive.boiler) {
            document.getElementById('boiler-tank-visual').classList.add('active');
            const bt = document.getElementById('boiler-state-text');
            bt.textContent = 'Hřeje vodu';
            bt.classList.add('active');
          }

          const summaryBadge = document.getElementById('appliances-summary-badge');
          summaryBadge.textContent = 'Aktivní';
          summaryBadge.className = 'status-badge active';
        }

        // Tlačítko další úroveň
        document.getElementById('btn-next-level').classList.remove('hidden');
        GameState.levelPassed = true;

        // Uložit splnění úrovně
        StorageManager.recordLevelCompletion(currentLevel.id, GameState.levelSeconds);
        this.updateStatsUI();

        // Otevřít úspěšný dialog po malé prodlevě
        setTimeout(() => {
          this.showSuccessModal(currentLevel);
        }, 1200);

      } else if (result.status === 'error') {
        if (result.type && (result.type.startsWith('short') || result.type === 'phase_on_chassis')) {
          SoundEngine.playShortCircuit();
        } else {
          SoundEngine.playTrip();
        }

        consoleEl.className = 'status-console status-danger';
        iconEl.textContent = '🔴';
        titleEl.textContent = result.title;
        descEl.textContent = result.message;

        const summaryBadge = document.getElementById('appliances-summary-badge');
        summaryBadge.textContent = 'Porucha / Zkrat';
        summaryBadge.className = 'status-badge fault';

        if (result.type && result.type.includes('socket')) {
          const sled = document.getElementById('socket-tester-led');
          sled.className = 'socket-led fault';
        }

      } else {
        // Warning (např. chybějící vodič, vypnutý vypínač)
        SoundEngine.playSwitch();
        consoleEl.className = 'status-console status-warning';
        iconEl.textContent = '🟠';
        titleEl.textContent = result.title;
        descEl.textContent = result.message;
      }
    },

    // Zobrazení dialogu po úspěšném dokončení úrovně
    showSuccessModal(level) {
      document.getElementById('modal-level-time').textContent = this.formatTime(GameState.levelSeconds);
      document.getElementById('modal-level-attempts').textContent = GameState.currentAttempts;
      document.getElementById('modal-level-eval').textContent =
        GameState.currentErrors === 0 ? 'Vynikající, napoprvé a bez chyb!' : `Vyřešeno s ${GameState.currentErrors} chybami.`;
      document.getElementById('modal-edu-tip').innerHTML = `<strong>Odborné ponaučení:</strong> ${level.eduTip}`;

      const modal = document.getElementById('modal-level-success');
      modal.classList.remove('hidden');
    },

    // Přechod do další úrovně nebo vyhodnocení celé hry
    proceedToNextLevel() {
      document.getElementById('modal-level-success').classList.add('hidden');
      const nextIndex = GameState.currentLevelIndex + 1;

      if (nextIndex < LEVELS.length) {
        this.loadLevel(nextIndex);
      } else {
        // Hra byla kompletně dokončena
        this.showGameCompleteModal();
      }
    },

    // Zobrazení certifikátu po dokončení všech úrovní
    showGameCompleteModal() {
      const stats = StorageManager.getStats();
      document.getElementById('final-total-time').textContent = this.formatTime(stats.totalTimeSpentSec);
      document.getElementById('final-total-errors').textContent = stats.totalErrors;

      const rate = stats.completedLevels.length > 0
        ? Math.round((stats.firstTrySuccessCount / stats.completedLevels.length) * 100)
        : 0;
      document.getElementById('final-first-try-rate').textContent = `${rate} %`;

      document.getElementById('modal-game-complete').classList.remove('hidden');
      SoundEngine.playSuccess();
    },

    // Formátování sekund na MM:SS
    formatTime(sec) {
      const m = Math.floor(sec / 60).toString().padStart(2, '0');
      const s = (sec % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    },

    // Běh časovače úrovně
    startTimer() {
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.timerInterval = setInterval(() => {
        if (!GameState.levelPassed) {
          GameState.levelSeconds++;
          document.getElementById('timer-display').textContent = this.formatTime(GameState.levelSeconds);
        }
      }, 1000);
    },

    // Aktualizace statistik v UI
    updateStatsUI() {
      const stats = StorageManager.getStats();
      const completedCount = stats.completedLevels.length;

      document.getElementById('stats-completed-count').textContent = `${completedCount} / ${LEVELS.length}`;
      document.getElementById('stats-total-attempts').textContent = stats.totalAttempts;
      document.getElementById('stats-total-errors').textContent = stats.totalErrors;

      const rate = completedCount > 0
        ? Math.round((stats.firstTrySuccessCount / completedCount) * 100)
        : 0;
      document.getElementById('stats-first-try-rate').textContent = `${rate} %`;

      // Naplnit tabulku po jednotlivých úrovních
      const tbody = document.getElementById('stats-table-body');
      if (tbody) {
        tbody.innerHTML = '';
        LEVELS.forEach(lvl => {
          const lvlData = stats.levelStats[lvl.id] || { attempts: 0, errors: 0, timeSec: 0, completed: false };
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td><strong>Úroveň ${lvl.id}:</strong> ${lvl.title}</td>
            <td>${lvlData.completed ? '<span style="color:#00e676;">✓ Splněno</span>' : '<span style="color:#9e9e9e;">— Nedokončeno</span>'}</td>
            <td>${lvlData.attempts}</td>
            <td>${lvlData.errors}</td>
            <td>${lvlData.timeSec ? this.formatTime(lvlData.timeSec) : '—'}</td>
          `;
          tbody.appendChild(tr);
        });
      }
    },

    // Navázání všech event listenerů
    bindEvents() {
      // 1. Výběr typu/barvy vodiče
      const wireBtns = document.querySelectorAll('.wire-btn');
      wireBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          wireBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          GameState.selectedWireColor = btn.dataset.color;
        });
      });

      // 2. Kliknutí na svorky
      this.containerEl.addEventListener('click', (e) => {
        const term = e.target.closest('.terminal');
        if (term) {
          this.handleTerminalClick(term);
        } else if (!e.target.closest('.wire-group')) {
          // Kliknutí mimo svorku i vodič ruší aktuální výběr
          this.clearTerminalSelection();
        }
      });

      // 3. Pohyb myši nad plátnem (gumová vodicí čára)
      this.containerEl.addEventListener('mousemove', (e) => {
        this.handleMouseMove(e);
      });

      // Klávesa ESC pro zrušení výběru svorky
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.clearTerminalSelection();
        }
      });

      // 4. Přepínače jističů a vypínačů na DIN liště (I / O)
      this.bindToggle('toggle-qs', 'flag-qs', (state) => {
        GameState.deviceStates.qs = state;
        SoundEngine.playSwitch();
        this.resetConsoleStatus();
      });

      this.bindToggle('toggle-rcd', 'flag-rcd', (state) => {
        GameState.deviceStates.rcd = state;
        SoundEngine.playSwitch();
        this.resetConsoleStatus();
      });

      this.bindToggle('toggle-mcb10', 'flag-mcb10', (state) => {
        GameState.deviceStates.mcb10 = state;
        SoundEngine.playSwitch();
        this.resetConsoleStatus();
      });

      this.bindToggle('toggle-mcb16', 'flag-mcb16', (state) => {
        GameState.deviceStates.mcb16 = state;
        SoundEngine.playSwitch();
        this.resetConsoleStatus();
      });

      // Testovací tlačítko RCD (vybaví chránič)
      const rcdTestBtn = document.getElementById('btn-rcd-test');
      if (rcdTestBtn) {
        rcdTestBtn.addEventListener('click', () => {
          SoundEngine.playTrip();
          const rcdToggle = document.getElementById('toggle-rcd');
          const rcdFlag = document.getElementById('flag-rcd');
          if (rcdToggle && rcdFlag) {
            const handle = rcdToggle.querySelector('.switch-handle');
            handle.classList.remove('state-on');
            handle.classList.add('state-off');
            handle.textContent = 'O';
            rcdFlag.className = 'flag-indicator state-off';
            GameState.deviceStates.rcd = false;
            this.showToast('Testovací tlačítko T: Proudový chránič správně vybavil!', 'warning');
          }
        });
      }

      // 5. Hlavní akční tlačítka
      document.getElementById('btn-test').addEventListener('click', () => {
        this.runSimulation();
      });

      document.getElementById('btn-undo').addEventListener('click', () => {
        this.undoLastWire();
      });

      document.getElementById('btn-clear-wires').addEventListener('click', () => {
        this.clearAllWires();
      });

      document.getElementById('btn-next-level').addEventListener('click', () => {
        this.proceedToNextLevel();
      });

      document.getElementById('btn-modal-next').addEventListener('click', () => {
        this.proceedToNextLevel();
      });

      // 6. Nápovědní lišta
      document.getElementById('btn-hint').addEventListener('click', () => {
        document.getElementById('hint-panel').classList.toggle('hidden');
      });

      document.getElementById('btn-close-hint').addEventListener('click', () => {
        document.getElementById('hint-panel').classList.add('hidden');
      });

      // 7. Zvuk
      const soundBtn = document.getElementById('btn-sound');
      soundBtn.addEventListener('click', () => {
        const isMuted = SoundEngine.toggleMute();
        soundBtn.textContent = isMuted ? '🔇' : '🔊';
        soundBtn.title = isMuted ? 'Zapnout zvuk' : 'Vypnout zvuk';
      });

      // 8. Modální okna (Statistiky, Teorie, Dokončení hry)
      document.getElementById('btn-stats').addEventListener('click', () => {
        this.updateStatsUI();
        document.getElementById('modal-stats').classList.remove('hidden');
      });

      document.getElementById('btn-close-stats').addEventListener('click', () => {
        document.getElementById('modal-stats').classList.add('hidden');
      });

      document.getElementById('btn-reset-stats').addEventListener('click', () => {
        if (confirm('Opravdu chcete vymazat veškerý uložený pokrok a statistiky?')) {
          StorageManager.resetAll();
          this.updateStatsUI();
          this.loadLevel(0);
          document.getElementById('modal-stats').classList.add('hidden');
        }
      });

      document.getElementById('btn-theory').addEventListener('click', () => {
        document.getElementById('modal-theory').classList.remove('hidden');
      });

      document.getElementById('btn-close-theory').addEventListener('click', () => {
        document.getElementById('modal-theory').classList.add('hidden');
      });

      document.getElementById('btn-restart-game').addEventListener('click', () => {
        document.getElementById('modal-game-complete').classList.add('hidden');
        this.loadLevel(0);
      });

      document.getElementById('btn-close-complete').addEventListener('click', () => {
        document.getElementById('modal-game-complete').classList.add('hidden');
      });

      // Zavření modálu kliknutím na pozadí
      const modals = document.querySelectorAll('.modal-backdrop');
      modals.forEach(m => {
        m.addEventListener('click', (e) => {
          if (e.target === m && m.id !== 'modal-level-success') {
            m.classList.add('hidden');
          }
        });
      });

      // Plynulá aktualizace vodičů při změně velikosti okna prohlížeče a scrollování
      window.addEventListener('resize', () => {
        this.renderWires();
      });

      this.containerEl.addEventListener('scroll', () => {
        this.renderWires();
      });
    },

    // Pomocná metoda pro obsluhu přepínače (I/O)
    bindToggle(toggleId, flagId, onStateChange) {
      const toggleEl = document.getElementById(toggleId);
      const flagEl = document.getElementById(flagId);
      if (!toggleEl || !flagEl) return;

      const handleEl = toggleEl.querySelector('.switch-handle');

      toggleEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOn = handleEl.classList.contains('state-on');
        const newState = !isOn;

        if (newState) {
          handleEl.classList.remove('state-off');
          handleEl.classList.add('state-on');
          handleEl.textContent = 'I';
          flagEl.className = 'flag-indicator state-on';
        } else {
          handleEl.classList.remove('state-on');
          handleEl.classList.add('state-off');
          handleEl.textContent = 'O';
          flagEl.className = 'flag-indicator state-off';
        }

        onStateChange(newState);
      });
    }
  };

  // Spuštění po načtení dokumentu
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => UIController.init());
  } else {
    UIController.init();
  }
})();
