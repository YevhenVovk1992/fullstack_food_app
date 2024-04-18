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
        return render_template('index.html', title='Start_with_us')
    if request.method == "POST":
        data = request.get_json()
        return jsonify(data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=os.environ.get('DEBUG'))
