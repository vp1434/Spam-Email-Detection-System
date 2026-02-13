import sys
import traceback

try:
    from flask import Flask, request, jsonify
    from flask_cors import CORS
    from spam_detector import SpamDetector

    app = Flask(__name__)
    CORS(app)

    detector = SpamDetector()

    @app.route('/predict', methods=['POST'])
    def predict():
        data = request.json
        text = data.get('text', '')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
            
        result = detector.predict(text)
        return jsonify(result)

    if __name__ == '__main__':
        print("Starting ML Service on port 5001...")
        app.run(port=5001)

except Exception:
    with open('error.log', 'w') as f:
        f.write(traceback.format_exc())
    print("Error occurred. Check error.log")
    sys.exit(1)

