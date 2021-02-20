from app import app
from flask import request
import json
# from methods import Methods

@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

# autorisation
@app.route('/auth', methods=['GET', 'POST'])
def auth():
    if request.method == "POST":
        f = request.get_json()
        print(f)
        return '200'
    else:
        return 'get'

# registration
# @app.route('/register', methods=['GET', 'POST'])
# def register():
#     if request.method == 'POST':
#         pass

# {"login": 'admin', "password": 'admin'}

# curl --request POST --header 'Content-Type: application/json' --data '{"login": "Loh", "password": "Pidr"}' 'http://127.0.0.1:5000/auth'

