import json
import random
from flask import Blueprint
from flask import request
from flask_login import LoginManager, UserMixin, login_required, login_user, current_user, logout_user
from lib.database.db import mongo

api = Blueprint('app', __name__)

from api import login_manager
from user import User

# logining
'''
Input: 
    login - user's login;
    password - user's entered password
Return:
    json doc with boolean result, message with error's description, information about user included his login and user's dialogs
'''
@api.route('/login', methods=['POST'])
def login():
    f = request.get_json()

    login = f.get('login')
    password = f.get('password')

    # data = mongo.db.dialogs_test.find({"login": login})
    data = mongo.db.users.find_one({"login": login})
    #print(data)
    if data is None:
        return {'result': False, 'errorMessage': 'Not existing user', 'userInfo': None}
    else:
        user = User(data['login'])
        user.password_hash = data['password']
        user.set_id(data['_id'])
        if user.check_password(password):
            return {'result': True, 'errorMessage': None, 'userInfo': {"userID":user.id, "login":login}}
        else:
            return {'result': False, 'errorMessage': 'Invalid password', 'userInfo': None}

# getting dialogs
'''
Input: 
    userID - Recomended format userID
Return:
    json doc with boolean result, message with error's description, information about user's dialogs
'''
@api.route('/dialogs', methods=['POST'])
def get_dialogs():
    f = request.get_json()
    
    userID = f.get('userID')
    data = mongo.db.dialogs_test.find_one({"_id": int(userID)})
    if data is None:
        return {'result': False, 'errorMessage': 'Not existing id', 'userInfo': None}
    else:
        return {'result': True, 'errorMessage': None, 'userInfo': {"dilogsData": data['dialogsData']}}

# registration new user
'''
@deprecated
Input: 
    login - new user's login;
    password - new user's password
Return:
    json doc with boolean result, message with error's  description, information about user included his login
'''
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

# creating new user's dialogs
'''
Input: login
Return: json doc with boolean result, message with error's description, information about user included his login and user's dialogs
'''
@api.route('/new_dialog', methods=['POST'])
def new_dialog():
    f = request.get_json
    login = f.get('login')

    data = mongo.db.users.find({"login": login})

    if data is None:
        return {'result': False, 'errorMessage': 'Not existing user', 'userInfo': None}
    else:
        return {'result': True, 'errorMessage': None, userInfo: None}


# curl --request POST --header 'Content-Type: application/json' --data '{"login": "Test", "password": "Test"}' 'http://127.0.0.1:5000/login'    