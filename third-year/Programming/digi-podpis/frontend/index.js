let loadedText = "";
let originalFileName = "soubor.txt";

// 1. Načtení souboru (zůstává stejné)
document.getElementById('inputFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;
    originalFileName = file.name;
    const reader = new FileReader();
    reader.onload = (e) => { loadedText = e.target.result; };
    reader.readAsText(file);
});

// 2. Podepsání a uložení
document.getElementById('btn').addEventListener('click', async function() {
    const selectElement = document.getElementById('userSelect');
    
    if (!loadedText) {
        alert("Nejdříve vyberte soubor!");
        return;
    }

    const key = selectElement.value;
    const hash = CryptoJS.MD5(loadedText + key).toString();

    // FORMÁTOVÁNÍ PODLE TVÉHO ZADÁNÍ:
    // Text souboru, prázdný řádek, --signature--, klíč a hash s popisky
    const finalContent = `${loadedText}\n\n--signature--\nkey: ${key}\nhash: ${hash}`;

    // Výpis do náhledu
    document.querySelector('#content p').textContent = finalContent;

    // Uložení souboru (vyvolá okno "Uložit jako")
    try {
        if (window.showSaveFilePicker) {
            const handle = await window.showSaveFilePicker({
                suggestedName: "signed_" + originalFileName,
                types: [{
                    description: 'Textové soubory',
                    accept: {'text/plain': ['.txt']},
                }],
            });
            const writable = await handle.createWritable();
            await writable.write(finalContent);
            await writable.close();
        } else {
            // Záložní stažení pro Firefox/starší prohlížeče
            const blob = new Blob([finalContent], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = "signed_" + originalFileName;
            a.click();
        }
    } catch (err) {
        console.log("Uživatel zrušil ukládání.");
    }
});