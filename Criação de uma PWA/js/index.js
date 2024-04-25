import { numbers, operations, phn_display } from './QuerySelector.js';

// Variável para armazenar a operação atual
let operation = null;

// Eventos para os botões de números
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (phn_display.textContent === "0") {
      phn_display.textContent = "";
    }
    phn_display.textContent += number.textContent;
  });
});

// Eventos para os botões de operações
operations.forEach((op) => {
  op.addEventListener("click", () => {
    if (operation === null) {
      phn_display.textContent += op.textContent;
        operation = op.textContent;
    }
  });
});

// Evento para o botão de Igual
document.getElementById("equalsBtn").addEventListener("click", () => {
  if (operation !== null) {
    let operationIndice = phn_display.textContent.indexOf(operation);
    let firstNumber = phn_display.textContent.substring(0, operationIndice);
    let lastNumber = phn_display.textContent.substring(operationIndice + 1);
    let resultado = 0;

    switch (operation) {
      case "+":
        resultado = parseFloat(firstNumber) + parseFloat(lastNumber);
        break;
      case "-":
        resultado = parseFloat(firstNumber) - parseFloat(lastNumber);
        break;
      case "*":
        resultado = parseFloat(firstNumber) * parseFloat(lastNumber);
        break;
      case "/":
        if (parseFloat(lastNumber) !== 0) {
          resultado = parseFloat(firstNumber) / parseFloat(lastNumber);
        } else {
          resultado = "Erro: Divisão por zero";
        }
        break;
    }

    phn_display.textContent = resultado;
    operation = null;
  }
});

// Evento para o botão de limpar
document.getElementById("clear").addEventListener("click", () => {
  phn_display.textContent = "";
  operation = null;
});

// Função para gerar a tabuada
function gerarTabuada(number, operation) {
  let tabuada = "";
// Converte os número inicial para um número
  let numInicial = parseFloat(number);
  for (let i = 1; i <= 10; i++) {
    switch (operation) {
      case "+":
        // Realiza a soma como números, não como strings
        tabuada += `${numInicial} + ${i} = ${numInicial + i}\n`;
        break;
      case "-":
        tabuada += `${numInicial} - ${i} = ${numInicial - i}\n`;
        break;
      case "*":
        tabuada += `${numInicial} * ${i} = ${numInicial * i}\n`;
        break;
      case "/":
        // Garante que o divisor não seja zero
        if (i !== 0) {
          tabuada += `${numInicial} / ${i} = ${numInicial / i}\n`;
        } else {
          tabuada += `${numInicial} / ${i} = Divisão por zero não é permitida\n`;
        }
        break;
    }
  }
  console.log(tabuada);
  phn_display.textContent = tabuada;
}

// Evento do botão para gerar a tabuada
document.getElementById("tabuadaBtn").addEventListener("click", () => {
  if (operation === null) {
    console.error("Nenhuma operação selecionada.");
    return;
  }

  let operationIndice = phn_display.textContent.indexOf(operation);
  let firstNumber = phn_display.textContent.substring(0, operationIndice);
  gerarTabuada(firstNumber, operation);
});
