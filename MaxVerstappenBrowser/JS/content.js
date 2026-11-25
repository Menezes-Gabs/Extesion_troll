// Configurações compartilhadas entre as abas.
const settings = { invasao: false, fiscal: false, comic: false };
const originals = new Map();
const photos = [
    'max1.jpg',
    'max2.jpg',
    'max3.jpg',
    'max4.png',
];
let available = [], observer, comicStyle, fiscalHost, fiscalTimer, shown = false;
// Usa somente imagens existentes; o SVG provisório funciona sem fotos.

async function loadPhotos() {
    available = (await Promise.all(photos.map(async (name) => {
        const url = chrome.runtime.getURL('IMG/' + name);
        try {
            const r = await fetch(url);
            return r.ok ? url : null;
        } catch {
            return null;
        }
    }))).filter(Boolean);
    if (!available.length)
        available = [chrome.runtime.getURL('IMG/max.svg')];
}

// Substitui as imagens e guarda os atributos originais.
function replaceImages() {
    if (!settings.invasao || !available.length)
        return;
    for (const img of document.querySelectorAll('img')) {
        if (!originals.has(img)) {
            const sources = Array.from(img.closest('picture')?.querySelectorAll('source') || []).map(s => [s, s.getAttribute('srcset')]);
            originals.set(img, { src: img.getAttribute('src'), srcset: img.getAttribute('srcset'), sources, url: available[Math.floor(Math.random() * available.length)] });
        }
        const data = originals.get(img);
        for (const [s] of data.sources)
            if (s.hasAttribute('srcset'))
                s.removeAttribute('srcset');
        if (img.hasAttribute('srcset'))
            img.removeAttribute('srcset');
        if (img.getAttribute('src') !== data.url)
            img.setAttribute('src', data.url);
    }
}

// Restaura um atributo ao valor anterior.
function restoreAttr(el, key, value) {
    if (value === null)
        el.removeAttribute(key);
    else
        el.setAttribute(key, value);
}

// Ativa ou desativa a substituição de imagens.
function invasion() {
    if (settings.invasao) {
        replaceImages();
        if (!observer) {
            observer = new MutationObserver(replaceImages);
            observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['src', 'srcset'] });
        }
    } else {
        observer?.disconnect();
        observer = null;
        for (const [img, data] of originals) {
            restoreAttr(img, 'src', data.src);
            restoreAttr(img, 'srcset', data.srcset);
            for (const [s, v] of data.sources)
                restoreAttr(s, 'srcset', v);
        }
        originals.clear();
    }
}

// Aplica ou remove a fonte Comic Sans.
function comic() {
    if (settings.comic && !comicStyle) {
        comicStyle = document.createElement('style');
        comicStyle.textContent = 'body, body :is(h1,h2,h3,h4,h5,h6,p,a,button,label,input,textarea,select,li,td,th,span,div):not([class*="icon"]):not([class*="Icon"]):not([class*="material-symbol"]){font-family:"Comic Sans MS","Comic Sans",cursive !important;}';
        document.documentElement.append(comicStyle);
    } else if (!settings.comic) {
        comicStyle?.remove();
        comicStyle = null;
    }
}

// Remove o aviso de produtividade.
function closeFiscal() {
    clearTimeout(fiscalTimer);
    fiscalHost?.remove();
    fiscalHost = null;
}

// Mostra um aviso nas redes sociais configuradas.
function fiscal() {
    if (!settings.fiscal) {
        closeFiscal();
        shown = false;
        return;
    }
    const host = location.hostname;
    const sites = [
        'youtube.com',
        'instagram.com',
        'tiktok.com',
        'twitch.tv',
        'x.com',
        'twitter.com',
    ];
    if (shown || !sites.some(s => host === s || host.endsWith('.' + s)))
        return;
    shown = true;
    const messages = [
        'Simply lovely. Agora vai estudar.',
        'Du du du du... to you homework.',
        'Box, box. Hora de voltar ao trabalho.',
        'Max já abriu 20 segundos. E o seu trabalho?',
        'Du du du du... menos uma volta de produtividade.',
    ];
    fiscalHost = document.createElement('div');
    fiscalHost.style.cssText = 'position:fixed;top:20px;right:20px;z-index:2147483647';
    const shadow = fiscalHost.attachShadow({ mode: 'closed' });
    const panel = document.createElement('div');
    panel.style.cssText = 'background:#171717;color:white;border:2px solid #183b78;border-radius:12px;padding:16px;width:260px;font:16px Arial;box-shadow:0 4px 20px #0006';
    const image = document.createElement('img');
    image.src = available[0];
    image.style.cssText = 'width:100%;height:140px;object-fit:contain';
    const title = document.createElement('strong');
    title.textContent = 'Fiscal de produtividade';
    const message = document.createElement('p');
    message.textContent = messages[Math.floor(Math.random() * messages.length)];
    const button = document.createElement('button');
    button.textContent = 'Foi mal, Max';
    button.style.cssText = 'padding:8px;cursor:pointer';
    button.onclick = closeFiscal;
    panel.append(image, title, message, button);
    shadow.append(panel);
    document.documentElement.append(fiscalHost);    
}

// Aplica as configurações atuais.
function apply() {
    invasion();
    comic();
    fiscal();
}

// Inicializa as configurações e os eventos.
async function init() {
    await loadPhotos();
    Object.assign(settings, await chrome.storage.local.get(Object.keys(settings)));
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area !== 'local')
            return;
        for (const key of Object.keys(settings))
            if (changes[key])
                settings[key] = !!changes[key].newValue;
        apply();
    });
    apply();
}

init();
