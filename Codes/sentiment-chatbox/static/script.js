function analyzeSentiment() {
    const userInput = document.getElementById('userInput').value.trim();
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');

    if (userInput === "") {
        alert("Please enter some text!");
        return;
    }

    resultDiv.style.opacity = 0; // Hide previous result
    loadingDiv.style.display = 'block';
    loadingDiv.innerHTML = ''; // Clear previous loading text
    typeWriterEffect("Analyzing...", loadingDiv);

    fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        loadingDiv.style.display = 'none';
        resultDiv.innerHTML = `Sentiment: <span>${data.sentiment}</span>`;
        resultDiv.style.opacity = 1;
    })
    .catch((error) => {
        console.error('Error:', error);
        loadingDiv.style.display = 'none';
        resultDiv.innerHTML = "Something went wrong. Please try again.";
        resultDiv.style.opacity = 1;
    });
}

function typeWriterEffect(text, element) {
    let i = 0;
    const speed = 100; // typing speed (milliseconds)

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}
