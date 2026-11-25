const keys = ['invasao', 'fiscal', 'comic'];

// Inicializa as configurações e os eventos.
async function init() {
    const settings = await chrome.storage.local.get(keys);
    for (const key of keys) {
        const input = document.getElementById(key);
        input.checked = !!settings[key];
        input.addEventListener('change', () => chrome.storage.local.set({ [key]: input.checked }));
    }
}

// Altera todos os modos de uma vez.
async function toggleAll(value) {
    await chrome.storage.local.set(Object.fromEntries(keys.map(k => [k, value])));
    keys.forEach(k => document.getElementById(k).checked = value);
}
document.getElementById('all').onclick = () => toggleAll(true);
document.getElementById('none').onclick = () => toggleAll(false);

init();
