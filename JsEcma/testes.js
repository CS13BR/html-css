//Faça um algoritmo que leia os valores de A, B, C e em seguida imprima na tela a soma entre A e B e
//mostre se a soma é menor que C.

let A = 5 
let B = 6
let C = 10

let D = A + B
if (D < C) {
    console.log("A soma entre  A", A, "e B", B, "é", D, "menor do que o valor C", C);
}
else {
    console.log("A soma entre A", A, "e B", B, "é", D, "maior do que valor de C", C,);
}



//Faça um algoritmo para receber um número qualquer e imprimir na tela se o número é par ou ímpar, positivo ou negativo.

let numero = prompt("Digite um numero:")

if(numero < 0) {
    console.log("Numero negativo")
} else {
    console.log("Numero positivo")
}

if (numero % 2) {
    console.log("é impar");
} else {
    console.log("é par");
}

//Faça um algoritmo que leia dois valores inteiros A e B,
// se os valores de A e B forem iguais, deverá somar os dois valores, 

let a = 10
let b = 15 

if (a === b) {
    let c = a + b;
    console.log("A soma dos numeros por eles serem iguais", c);
} else { 
    let c = a * b;

    console.log("a multiplicação por eles serem diferentes", c );
}



let nub = 3;

if (nub) {
    console.log("2");
}
