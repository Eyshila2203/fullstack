let secret = Math.floor(Math.random() * 11);
console.log("Faça seu chute:", secret);

function verificarAdivinhacao() {
    let palpite = document.getElementById("numero");
    let chute = parseInt(palpite.value);
    let elementoCorpo = document.body;

    if (isNaN(chute)) {
        alert("Digite um número: ");
        return;
    }

    if (chute === secret) {
        alert("YOU WIN!!");
        elementoCorpo.style.setProperty("background-color", "green");
    }

    else {
        elementoCorpo.style.setProperty("background-color", "red");

        if (chute > secret) {
            alert("YOU LOSE! Seu chute é MAIOR que o número secreto.");
        } 
        else {
            alert("YOU LOSE! Seu chute é MENOR que o número secreto.");
        }
    }
}
