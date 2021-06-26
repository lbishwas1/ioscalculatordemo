  let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".answer");
console.log(screen.innerText);


function buttonClick(value) {
  if (isNaN(parseFloat(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  
    if (buffer === "0") {
    buffer = value;
  } else {
      if(parseInt(buffer)<=99999999999999)
      {
        if(parseFloat(buffer)>=99999999)
        {
            document.querySelector('.ans').style.fontSize="40px";
        buffer += value;
      }
      else{
          buffer +=value;
      }
    }
      else{
          buffer = buffer;
      }
  }
}

function handleMath(value) {
  if (buffer === "0") {
    // do nothing
    return;
  }

  const intBuffer = parseFloat(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;

  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  }
  else if (previousOperator === "÷") {
    runningTotal /= intBuffer;
  }
}

function handleSymbol(value) {
    let flag=0;
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
      case "%":
           buffer=buffer/100;
           rerender();
          break;
    case "+/-":
        buffer=-buffer;
        break;
    case ".":
        if(flag==0)
        {
        buffer=buffer+'.';
            flag++;
    }
       break;
    case "=":
      if (previousOperator === null) {
        // need two numbers to do math
        return;
      }
     
      flushOperation(parseFloat(buffer));
      previousOperator = null;
      buffer = +runningTotal;
      runningTotal = 0;
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
    case ".":
      handleMath(value);
      break;
  }
}

function rerender() {
  screen.innerText = buffer;
}

function init() {
  document.querySelector(".symbols").addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
  });
}

init();