let token = null;
let enteredPin = "";

function updatePinDisplay() {
  const pinDisplay = document.getElementById('pin-display');
  pinDisplay.innerText = '*'.repeat(enteredPin.length).padEnd(4, '_');
}

function appendDigit(digit) {
  if (enteredPin.length >= 4) return;
  enteredPin += digit;
  updatePinDisplay();
}

function clearPin() {
  enteredPin = "";
  updatePinDisplay();
}

async function login() {
  console.log("Entered PIN sent to server:", enteredPin);

  const res = await fetch('/auth/login/pin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pin: enteredPin })
  });

  if (res.ok) {
    const data = await res.json();
    token = data.token;
    showToast("Login successful", "success");

    document.getElementById('pin-display').style.display = 'none';
    document.querySelector('.keypad').style.display = 'none';

    document.getElementById('atm-menu').style.display = 'block';
    getBalance();
  } else {
    showToast("Invalid PIN", "error");
  }

  clearPin();
}


async function getBalance() {
  const res = await fetch('/atm/balance', {
    headers: { 'Authorization': 'Bearer ' + token }
  });

  if (res.ok) {
    const data = await res.json();
    document.getElementById('balance').innerText =
      `Balance: Rp ${parseFloat(data.balance).toLocaleString()}`;
  } else {
    showToast("Failed to fetch balance", "error");
  }
}

async function deposit() {
  const amount = parseFloat(document.getElementById('depositAmount').value);
  if (isNaN(amount) || amount <= 0) {
    showToast("Invalid deposit amount", "error");
    return;
  }

  const res = await fetch('/atm/deposit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ amount })
  });

  if (res.ok) {
    showToast("Deposit successful", "success");
    getBalance();
  } else {
    showToast("Deposit failed", "error");
  }
}

async function withdraw() {
  const amount = parseFloat(document.getElementById('withdrawAmount').value);
  if (isNaN(amount) || amount <= 0) {
    showToast("Invalid withdraw amount", "error");
    return;
  }

  const res = await fetch('/atm/withdraw', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ amount })
  });

  if (res.ok) {
    showToast("Withdrawal successful", "success");
    getBalance();
  } else {
    const data = await res.json();
    showToast(data.message || "Withdrawal failed", "error");
  }
}

async function transfer() {
  const amount = parseFloat(document.getElementById('transferAmount').value);
  const targetAccountId = parseInt(document.getElementById('targetAccountId').value);

  if (!targetAccountId || isNaN(amount) || amount <= 0) {
    showToast("Invalid transfer input", "error");
    return;
  }

  const res = await fetch('/atm/transfer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ targetAccountId, amount })
  });

  if (res.ok) {
    showToast("Transfer successful", "success");
    getBalance();
  } else {
    const data = await res.json();
    showToast(data.message || "Transfer failed", "error");
  }
}

function showToast(message, type = "info") {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerText = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
