import json
import random
from flask import Blueprint
from flask import request
from flask_login import LoginManager, UserMixin, login_required, login_user, current_user, logout_user
from lib.database.db import mongo

api = Blueprint('app', __name__)

from api import login_manager
from user import User

@api.route('/login', methods=['POST'])
def login():
    f = request.get_json()

    login = f.get('login')
    password = f.get('password')

    data = mongo.db.users.find_one({"login": login})
    if data is None:
        return {'result': False, 'errorMessage': 'Not existing user', 'userInfo': None}
    else:
        user = User(data['login'])
        user.password_hash = data['password']
        user.set_id(data['_id'])
        if user.check_password(password):
            user.set_dialogs(data['dialogs'])
            return {'result': True, 'errorMessage': None, 'userInfo': {"login":login, "dialogs": user.dialogs}}
        else:
            return {'result': False, 'errorMessage': 'Invalid password', 'userInfo': None}

# registration new user
@api.route('/registration', methods=['POST'])
def register():
    f = request.get_json()

    login = f.get('login')
    password = f.get('password')
    user = mongo.db.users.find({"login": login}).count()

    if user == 0:
        new_user = User(login)
        new_user.set_password(password)
        mongo.db.users.insert_one({"_id": new_user.id, "login":login, "password":new_user.password_hash, "dialogs":new_user.dialogs})
        return {'result': True, 'errorMessage': None, 'userInfo': {"login":login}}

    return {'result': False, 'errorMessage': 'Already existing user', 'userInfo': None}

# curl --request POST --header 'Content-Type: application/json' --data '{"login": "Test", "password": "Test"}' 'http://127.0.0.1:5000/login'    