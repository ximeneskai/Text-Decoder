//REGRAS DE CRIPTOGRAFIA
const rules = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

//REGRAS DE DESCRIPTOGRAFIA UTILIZANDO O INVERSO DA CRIPTOGRAFIA
const reverseRules = Object.fromEntries(
    Object.entries(rules).map(([key, value]) => [value, key])
);

// FUNÇÃO - CRIPTOGRAFAR
function encrypt(text) {
    return text.split('')
        .map(char => rules[char] || char)
        .join('');
}

// FUNÇÃO - DESCRIPTOGRAFAR
function decrypt(text) {
    const keys = Object.keys(reverseRules).sort((a, b) => b.length - a.length);

    let result = text;
    keys.forEach(key => {
        const regex = new RegExp(key, 'g');
        result = result.replace(regex, reverseRules[key]);
    });

    return result;
}

// PROCESSANDO O TEXTO
function processText(action) {
    const inputText = document.getElementById('inputText').value;
    const outputText = document.getElementById('outputText');
    const placeholderImage = document.getElementById('placeholderImage');
    const statusMessage = document.querySelector('.status-message');
    const defaultMessage = document.getElementById('defaultMessage');
    const copyButton = document.querySelector('.botao-copiar');

    if (action === 'criptografar') {
        outputText.value = encrypt(inputText);
    } else if (action === 'descriptografar') {
        outputText.value = decrypt(inputText);
    }

    // ATUALIZAÇÃO DE VISUALIZAÇÃO DE IMAGEM E MENSAGEM
    if (outputText.value.trim()) {
        placeholderImage.classList.add('hidden');
        defaultMessage.classList.add('hidden');
        copyButton.classList.remove('hidden');
        statusMessage.textContent = 'Mensagem encontrada:';
    } else {
        placeholderImage.classList.remove('hidden');
        statusMessage.classList.remove('hidden');
        defaultMessage.classList.remove('hidden');
        copyButton.classList.add('hidden');
        statusMessage.textContent = 'Nenhuma mensagem encontrada';
    }
}

// FUNÇÃO - COPIAR
function copiarTexto() {
    const outputText = document.getElementById('outputText').value;
    
    navigator.clipboard.writeText(outputText)
        .then(() => {
            alert('Texto copiado para a área de transferência!');
        })
        .catch(err => {
            console.error('Erro ao copiar o texto: ', err);
        });
}