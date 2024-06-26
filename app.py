import json
import os
import dotenv

from flask import Flask, request, render_template, jsonify

# Loading environment variables from .env file into the project
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
dotenv.load_dotenv(dotenv_path)

app = Flask(__name__)
app.secret_key = os.environ.get('SESSION_SECRET')


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == "GET":        
        return render_template('index.html', title='Start_with_us'), 200
    if request.method == "POST":
        data = request.get_json()
        return jsonify(data), 200


@app.route('/get_menu/', methods=['GET'])
def get_menu():
    with open('db.json', 'r', encoding="utf-8") as file:
        menu = file.read()
        return jsonify(menu), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=os.environ.get('DEBUG'))
