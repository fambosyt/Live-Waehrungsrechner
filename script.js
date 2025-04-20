const from = document.getElementById("from");
const to = document.getElementById("to");

async function loadCurrencies() {
  const res = await fetch("https://api.exchangerate.host/symbols");
  const data = await res.json();
  const symbols = data.symbols;

  for (let code in symbols) {
    const option1 = new Option(`${code} - ${symbols[code].description}`, code);
    const option2 = new Option(`${code} - ${symbols[code].description}`, code);
    from.appendChild(option1);
    to.appendChild(option2);
  }

  from.value = "EUR";
  to.value = "USD";
}

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = from.value;
  const toCurrency = to.value;

  if (!amount || amount <= 0) {
    alert("Bitte gib einen gültigen Betrag ein.");
    return;
  }

  const res = await fetch(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`);
  const data = await res.json();

  document.getElementById("result").textContent = 
    `${amount} ${fromCurrency} = ${data.result.toFixed(2)} ${toCurrency}`;
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

loadCurrencies();
