let saldo = 997.00;
let currentRotation = 0;
let isSpinning = false;

function updateUI() {
    document.getElementById('saldo').innerText = saldo.toFixed(2);
}

function adjustBet(factor) {
    if (isSpinning) return;
    const betInput = document.getElementById('betAmount');
    let currentValue = parseFloat(betInput.value);
    
    if (factor === 0.5) {
        currentValue /= 2;
    } else if (factor === 2) {
        currentValue *= 2;
    }
    
    // Garante valor mínimo e formatação
    if (currentValue < 0.10) currentValue = 0.10;
    betInput.value = currentValue.toFixed(2);
}

function spin() {
    if (isSpinning) return;
    
    const betInput = document.getElementById('betAmount');
    const betValue = parseFloat(betInput.value);
    
    if (betValue > saldo) {
        alert("Saldo Insuficiente!");
        return;
    }

    if (betValue < 0.10) {
        alert("Aposta mínima é R$ 0.10");
        return;
    }

    saldo -= betValue;
    isSpinning = true;
    document.querySelector('.btn-spin').disabled = true;
    updateUI();

    const wheel = document.getElementById('wheel');
    const statusText = document.getElementById('status-text');
    
    // Gira pelo menos 5 voltas (1800 graus)
    const extraDegrees = Math.floor(Math.random() * 360) + 1800; 
    currentRotation += extraDegrees;
    
    wheel.style.transform = `rotate(${currentRotation}deg)`;
    
    statusText.innerText = "SORTEANDO...";
    statusText.className = "status-spinning";

    setTimeout(() => {
        // Blaze Double é de 0 a 14
        const resultNum = Math.floor(Math.random() * 15); 
        finishGame(resultNum);
    }, 5000);
}

function finishGame(num) {
    isSpinning = false;
    document.querySelector('.btn-spin').disabled = false;
    const statusText = document.getElementById('status-text');
    
    statusText.innerText = "SAIU O NÚMERO: " + num;
    
    addToHistory(num);

    // Lógica simples de ganho (precisaria dos botões de cor)
    // Se ganhasse, saldo += betValue * fator
    updateUI();
}

function addToHistory(num) {
    const historyDiv = document.getElementById('history');
    const item = document.createElement('div');
    
    // Classificação de cor para Blaze Double
    let colorClass = '';
    if (num === 0) {
        colorClass = 'white';
    } else if (num <= 7) {
        colorClass = 'red';
    } else {
        colorClass = 'black';
    }
    
    item.className = 'history-item ' + colorClass;
    item.innerText = num;
    
    // Mantém apenas os últimos 15 resultados
    if (historyDiv.children.length >= 15) {
        historyDiv.removeChild(historyDiv.lastChild);
    }
    historyDiv.prepend(item);
}

// Inicializa a interface
updateUI();