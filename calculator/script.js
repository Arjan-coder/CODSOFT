let history = document.getElementById('history');
let result = document.getElementById('result');
let buttons = Array.from(document.getElementsByClassName('btn'));
let historyText = '';
let currentInput = '';

function updateDisplay() {
  result.innerText = currentInput || '0';
}

function handleButtonClick(value) {
  switch (value) {
    case 'C':
      currentInput = '';
      historyText = '';
      history.innerText = '';
      break;
    case '=':
      try {
        currentInput = eval(currentInput);
        historyText += ` = ${currentInput}\n`;
        history.innerText = historyText;
      } catch {
        currentInput = 'Error';
      }
      break;
    case '←':
      if (currentInput) {
        currentInput = currentInput.slice(0, -1);
      }
      break;
    default:
      if (currentInput === 'Error') {
        currentInput = '';
      }
      currentInput += value;
  }
  updateDisplay();
}


buttons.map(button => {
  button.addEventListener('click', (e) => {
    handleButtonClick(e.target.innerText);
  });
});

document.addEventListener('keydown', (e) => {
  const key = e.key;
  if ((key >= '0' && key <= '9') || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
    handleButtonClick(key);
  } else if (key === 'Enter' || key === '=') {
    handleButtonClick('=');
  } else if (key === 'Backspace') {
    handleButtonClick('←');
  } else if (key === 'Escape') {
    handleButtonClick('C');
  }
});