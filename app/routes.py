from app import app
from flask import request

@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

# autorisation
@app.route('/auth', methods=['GET', 'POST'])
def auth():
    if request.method == "POST":
        return 'post'
    else:
        return 'get'

# registration
def register(): pass