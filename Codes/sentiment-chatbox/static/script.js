async function analyzeSentiment() {
    const userInput = document.getElementById('userInput').value.trim();
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');

    if (userInput === '') {
        resultDiv.innerHTML = '<span class="neutral">Please enter a tweet!</span>';
        return;
    }

    loadingDiv.style.display = 'block';
    resultDiv.innerHTML = '';

    const response = await fetch('/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userInput })
    });

    const data = await response.json();

    loadingDiv.style.display = 'none';

    let sentimentClass = '';
    if (data.sentiment === 'Positive') {
        sentimentClass = 'positive';
    } else if (data.sentiment === 'Negative') {
        sentimentClass = 'negative';
    } else {
        sentimentClass = 'neutral';
    }

    resultDiv.innerHTML = `<span class="${sentimentClass}">${data.sentiment} (${data.confidence}%)</span>`;
}
