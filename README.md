[README.md](https://github.com/user-attachments/files/35437160/README.md)
# Max Verstappen Browser Experience

> Simply lovely. 0% utilidade pública.

![Versão](https://img.shields.io/badge/versão-1.0.0-blue)
![Manifest](https://img.shields.io/badge/Manifest-V3-red)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E)

Extensão humorística para o Google Chrome inspirada em Max Verstappen e na Fórmula 1. O projeto transforma a experiência de navegação com três modos de zoeira independentes, desenvolvidos utilizando tecnologias web nativas.

## Funcionalidades

| Modo | Descrição |
| --- | --- |
| Invasão Verstappen | Substitui elementos de imagem dos sites por fotos aleatórias do Max, inclusive imagens carregadas dinamicamente. |
| Fiscal de produtividade | Exibe avisos humorísticos ao acessar redes sociais selecionadas. |
| Comic Sans Supremo | Altera a tipografia de diversos elementos dos sites para Comic Sans. |
| Ativar o caos | Ativa os três modos simultaneamente. |
| Restaurar sanidade | Desativa todos os modos. |

As preferências são armazenadas localmente e compartilhadas entre as abas. Todos os modos começam desativados.

## Tecnologias utilizadas

- HTML5 e CSS3 — interface do painel.
- JavaScript — manipulação do DOM e lógica dos modos.
- Chrome Extensions API — Manifest V3, Content Scripts e `chrome.storage.local`.
- MutationObserver — acompanhamento de alterações nas imagens das páginas.
- Shadow DOM — isolamento do painel do fiscal de produtividade.

## Estrutura do projeto

```text
MaxVerstappenBrowser/
├── CSS/
│   └── popup.css
├── HTML/
│   └── popup.html
├── IMG/
│   └── max.svg
├── JS/
│   ├── content.js
│   └── popup.js
├── manifest.json
├── LEIA-ME.txt
└── README.md
```

## Instalação

Não é necessário instalar Node.js, dependências ou configurar um servidor.

1. Baixe e extraia os arquivos do projeto.
2. Abra o Google Chrome e acesse `chrome://extensions/`.
3. Ative o **Modo do desenvolvedor**.
4. Clique em **Carregar sem compactação**.
5. Selecione a pasta que contém o arquivo `manifest.json`.
6. Recarregue as páginas abertas e acesse a extensão pelo menu de extensões do navegador.
7. Ative os modos desejados.

## Personalização

### Imagens

Adicione suas próprias fotos na pasta `IMG/`, utilizando os nomes abaixo:

```text
max1.jpg
max2.jpg
max3.jpg
max4.jpg
```

Uma única foto já é suficiente. Caso nenhuma esteja disponível, a extensão utilizará o arquivo `max.svg` como imagem provisória. As fotografias não acompanham a versão original do projeto.

### Fiscal de produtividade

As mensagens e os domínios monitorados podem ser personalizados na função `fiscal()`, dentro de `JS/content.js`.

```javascript
const messages = [
    'Simply lovely. Agora vai estudar.',
    'Max fazendo volta rápida e você aí.',
    'Box, box. Hora de voltar ao trabalho.',
    'Max já abriu 20 segundos. E o seu trabalho?',
    'Du du du du... menos uma volta de produtividade.'
];
```

Sites configurados: YouTube, Instagram, TikTok, Twitch, X e Twitter. O aviso aparece uma vez por carregamento da página enquanto o modo está ativo e desaparece após cinco segundos ou ao clicar em **Foi mal, Max**.

Após modificar os arquivos, recarregue a extensão em `chrome://extensions/` e atualize a página em que estiver testando.

## Privacidade e permissões

A extensão utiliza a permissão `storage` para salvar as configurações e executa scripts de conteúdo em páginas HTTP e HTTPS para aplicar os efeitos visuais. Os recursos de imagem são locais. O código não implementa coleta de dados pessoais, telemetria ou comunicação com servidores externos.

A instalação e a ativação dos modos devem ser voluntárias.

## Limitações

- A invasão modifica elementos HTML `img`, não vídeos ou imagens de fundo CSS.
- Comic Sans depende da disponibilidade da fonte no sistema; caso contrário, utiliza uma fonte cursiva alternativa.
- Páginas internas do Chrome e outros contextos protegidos não são modificados.
- Em sites dinâmicos, pode ser necessário desativar os modos e recarregar a página para restaurar completamente a aparência original.
- A compatibilidade prática com diferentes sites ainda precisa ser testada.

## Aviso

Projeto independente, desenvolvido para entretenimento e aprendizado de desenvolvimento web.

---

**DU DU DU DU, MAX VERSTAPPEN.**
