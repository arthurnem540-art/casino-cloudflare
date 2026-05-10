let saldo = 1000.00;
let currentRotation = 0;

function spin() {
    const betInput = document.getElementById('betAmount');
    const betValue = parseFloat(betInput.value);
    
    if (betValue > saldo) {
        alert("Saldo Insuficiente!");
        return;
    }

    saldo -= betValue;
    updateUI();

    const wheel = document.getElementById('wheel');
    const extraDegrees = Math.floor(Math.random() * 360) + 1800; // Pelo menos 5 voltas
    currentRotation += extraDegrees;
    
    wheel.style.transform = `rotate(${currentRotation}deg)`;
    document.getElementById('status-text').innerText = "SORTEANDO...";

    setTimeout(() => {
        const resultNum = Math.floor(Math.random() * 15); // Blaze Double é de 0 a 14
        finishGame(resultNum);
    }, 5000);
}

function finishGame(num) {
    document.getElementById('status-text').innerText = "SAIU O NÚMERO: " + num;
    addToHistory(num);
    // Aqui você adicionaria a lógica de ganho (se acertou a cor, etc)
}

function addToHistory(num) {
    const historyDiv = document.getElementById('history');
    const item = document.createElement('div');
    item.className = 'history-item ' + (num === 0 ? 'white' : (num <= 7 ? 'red' : 'black'));
    item.innerText = num;
    
    if (historyDiv.children.length >= 10) historyDiv.removeChild(historyDiv.lastChild);
    historyDiv.prepend(item);
}

function updateUI() {
    document.getElementById('saldo').innerText = saldo.toFixed(2);
}