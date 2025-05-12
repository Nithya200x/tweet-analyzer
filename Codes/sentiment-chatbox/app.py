from flask import Flask, request, jsonify, render_template
from transformers import pipeline

app = Flask(__name__)

# Load the Hugging Face sentiment analysis pipeline
sentiment_analyzer = pipeline('sentiment-analysis')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data['text']
    
    # Using the Hugging Face model to analyze sentiment
    analysis = sentiment_analyzer(text)[0]
    
    sentiment_label = analysis['label']
    
    if sentiment_label == 'POSITIVE':
        sentiment_result = 'Positive'
    elif sentiment_label == 'NEGATIVE':
        sentiment_result = 'Negative'
    else:
        sentiment_result = 'Neutral'  # Just in case (rare)

    return jsonify({'sentiment': sentiment_result})

if __name__ == '__main__':
    app.run(debug=True)
