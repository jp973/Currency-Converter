const currencyList = ["USD", "EUR", "GBP", "INR", "AUD", "CAD", "JPY", "CNY"];

document.addEventListener("DOMContentLoaded", () => {
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");

    currencyList.forEach(currency => {
        let option1 = new Option(currency, currency);
        let option2 = new Option(currency, currency);
        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "INR";
});

async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const from = document.getElementById("fromCurrency").value;
    const to = document.getElementById("toCurrency").value;

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    try {
        const response = await fetch(`/convert?from=${from}&to=${to}&amount=${amount}`);
        const data = await response.json();
        
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById("result").innerText = `Converted Amount: ${data.convertedAmount} ${to}`;
        }
    } catch (error) {
        alert("Failed to fetch conversion rates.");
    }
}
