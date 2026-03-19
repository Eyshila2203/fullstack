function DarAlerta(){
    var texticulo = document.getElementById("texticulo").value
    window.alert("seu amigo é o " +texticulo);
}


DarAlerta("conteudo da variavel que eu quis dar");


window.alert ("ESTE É UM ALERTA");
console.log("Esta msg esta escondida");

var entrada = prompt("entre com a sua idade");

console.log(entrada);

entrada= parseInt(entrada);

if (entrada>= 18){
    console.log("você é de maior");
    document.getElementById("testeID").innerHTML= "Você é de maior"
    document.getElementById("bodinho").style.setProperty("background-color","red");
}else if(entrada<18){
    console.log("DE MENOR!");
}else{
    console.log("INVÁLIDO");
}
    