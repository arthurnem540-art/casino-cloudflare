let saldo = 1000.00;
let selectedColor = null;
let currentRotation = 0;

function selectBet(color) {
    selectedColor = color;
    document.querySelectorAll('.bet-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelector('.' + color).classList.add('selected');
}

function adjustBet(factor) {
    let input = document.getElementById('betAmount');
    input.value = (parseFloat(input.value) * factor).toFixed(2);
}

function spin() {
    const amount = parseFloat(document.getElementById('betAmount').value);
    
    if (!selectedColor) return alert("Selecione uma cor primeiro!");
    if (amount > saldo) return alert("Saldo insuficiente!");

    saldo -= amount;
    updateUI();

    const wheel = document.getElementById('wheel');
    const extraDegrees = Math.floor(Math.random() * 360) + 2160; // 6 voltas completas
    currentRotation += extraDegrees;
    
    wheel.style.transform = `rotate(${currentRotation}deg)`;
    document.getElementById('spinBtn').disabled = true;

    setTimeout(() => {
        const result = Math.floor(Math.random() * 15); // 0 a 14
        let winColor = result === 0 ? 'white' : (result <= 7 ? 'red' : 'black');
        
        if (selectedColor === winColor) {
            let multiplier = winColor === 'white' ? 14 : 2;
            saldo += amount * multiplier;
            document.getElementById('status-text').innerText = `GANHOU! Saiu ${winColor}`;
        } else {
            document.getElementById('status-text').innerText = `PERDEU! Saiu ${winColor}`;
        }
        
        document.getElementById('spinBtn').disabled = false;
        addToHistory(winColor, result);
        updateUI();
    }, 5000);
}

function addToHistory(color, num) {
    const hist = document.getElementById('history');
    const item = document.createElement('div');
    item.className = `hist-item ${color}`;
    item.innerText = num;
    hist.prepend(item);
}

function updateUI() {
    document.getElementById('saldo').innerText = saldo.toFixed(2);
}