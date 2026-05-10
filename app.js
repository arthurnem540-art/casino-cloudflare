let saldo = 1000;

function girar() {
    if (saldo < 10) {
        alert("Saldo insuficiente!");
        return;
    }

    saldo -= 10;
    document.getElementById('saldo').innerText = saldo;
    
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerText = "Girando...";

    setTimeout(() => {
        const sorteio = Math.random();
        if (sorteio > 0.7) {
            saldo += 50;
            resultadoDiv.innerText = "GANHOU! +50 moedas";
            resultadoDiv.style.color = "#00ff00";
        } else {
            resultadoDiv.innerText = "PERDEU! Tente de novo";
            resultadoDiv.style.color = "#ff4444";
        }
        document.getElementById('saldo').innerText = saldo;
    }, 1000);
}