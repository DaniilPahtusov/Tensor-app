import json
import random
from flask import Blueprint
from flask import request
from lib.user import User
from lib.users import Users
from lib.database.db import mongo

api = Blueprint('app', __name__)

# authorisation
@api.route('/auth', methods=['GET', 'POST'])
def auth():
    if request.method == "POST":
        f = request.get_json()
        return '200'
    else:
        return 'get'


# registration new user
@api.route('/registration', methods=['POST'])
def register():
    f = request.get_json()

    login = f.get('login')
    password = f.get('password')
    user = mongo.db.users.find({"login": login}).count()

    if user == 0:
        mongo.db.users.insert_one({"login":login, "password":password})
        return {'result': True, 'errorMessage': None, 'userInfo': {"login":login, "password":password}}

    return {'result': False, 'errorMessage': 'Already existing user', 'userInfo': None}
# curl --request POST --header 'Content-Type: application/json' --data '{"login": "Loh", "password": "Pidr"}' 'http://127.0.0.1:5000/auth'