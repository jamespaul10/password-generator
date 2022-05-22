// DOM elements
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const lowercaseEl = document.getElementById("lowercase");
const uppercaseEl = document.getElementById("uppercase");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbols");
const generateEl = document.getElementById("Generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

// generate Event listener
generateEl.addEventListener("click", () => {
   const length = +lengthEl.value;
   const hasUpper = uppercaseEl.checked;
   const hasLower = lowercaseEl.checked;
   const hasNumber = numberEl.checked;
   const hasSymbol = symbolEl.checked;

  resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// Copy Password to clipboard
clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert("password copied to clipboard");
})

// Generate Password function
function generatePassword(lower, upper, number, symbol, length) {
  //1. Init Pw var
  //2. filter out unchecked type
  //3. loop over length call generate function for each type
  //4. add final pw to pw var and return

  let generatedPassword = '';

  const typeCount = lower+ upper+ number+ symbol;


  const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item =>
     Object.values(item)[0]
  );
//console.log(typesArr);
  if (typeCount === 0) {
    return '';
  }

 for (let i =0; i < length; i+= typeCount) {
   typesArr.forEach(type => {
     const funcName = Object.keys(type)[0];

    // console.log("funcName:", funcName);
     generatedPassword += randomFunc[funcName]();
   })
 }

 const finalPassword  = generatedPassword.slice(0, length);

 return finalPassword;

}


// Generate functions

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random()*26 + 97));
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random()*26 + 65));
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random()*26 + 65));
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random()*10 + 48));
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
   return symbols[Math.floor(Math.random()*symbols.length)]
}
