from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)
app.config['SPECIFICATION_FOLDER'] = './assets'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    if file:
        filename = file.filename[:file.filename.rfind('.')]
        filename = os.path.join(app.config['SPECIFICATION_FOLDER'], filename)
        filename = filename + '.json'
        with open(filename, 'r') as f:
            json_data = json.load(f)
        print(json_data)
        return jsonify({'json_data': json_data})

if __name__ == '__main__':
    app.run(debug=True)
