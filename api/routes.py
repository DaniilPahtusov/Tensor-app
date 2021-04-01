import json
from random import randint
from flask import Blueprint
from flask import request
from flask_login import LoginManager, UserMixin, login_required, login_user, current_user, logout_user
from lib.database.db import mongo

api = Blueprint('app', __name__)

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

    data = mongo.db.users.find_one({"login": login})
    if data is None:
        return {'result': False, 'errorMessage': 'Not existing user', 'userInfo': None}
    else:
        user = User(data['login'])
        user.password_hash = data['password']
        user.set_id(data['_id'])
        if user.check_password(password):
            user.set_dialogs(data['dialogs'])
            return {'result': True, 'errorMessage': None, 'userInfo': {"userID":user.id, "login":login, "dialogs": user.dialogs}}
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

# geting defined user dialog
'''
sa
'''
@api.route('/dialog', methods=['POST'])
def get_dialog():
    f = request.get_json()

    dialogID = f.get('dialogID')
    data = mongo.db.dialogs.find_one({"_id": dialogID})
    if data is None:
        return {'result': False, 'errorMessage': 'Not existing id', 'userInfo': None}
    else:
        return {'result': True, 'errorMessage': None, 'userInfo': data}

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
    image = f.get('image')
    user = mongo.db.users.find({"login": login}).count()

    if user == 0:
        new_user = User(login)
        new_user.set_password(password)
        mongo.db.users.insert_one({"_id": new_user.id, "login":login, "password":new_user.password_hash, "image": image, "dialogs":new_user.dialogs})
        return {'result': True, 'errorMessage': None, 'userInfo': {"login":login}}

    return {'result': False, 'errorMessage': 'Already existing user', 'userInfo': None}

# creating new user's dialogs
'''
Input: sender and recipient logins
Return: json doc with boolean result, message with error's description
'''
@api.route('/new_dialog', methods=['POST'])
def new_dialog():
    f = request.get_json()
    sender = f.get('sender')
    recipient = f.get('recipient')
    
    if existing_dialog(sender, recipient):
        return {'result': False, 'errorMessage': 'already existing dialog', 'userInfo': None}

    dialogID = randint(1000000000, 9999999999)

    recipient_data = mongo.db.users.find_one({"login": recipient})
    recipient_image = recipient_data['image']
    
    users_json = {"lastMessage": "", "id": dialogID, "photoId": recipient_image, "login": recipient, "sender": ""} # new dialog to users DB
    dialogs_json = {"_id": dialogID, "messages": []} # new dialog to dialogs DB

    if mongo.db.users.find({"login": recipient}) is None:
        return {'result': False, 'errorMessage': 'Not existing recipient', 'userInfo': None}
    else:
        mongo.db.users.update({"login": sender}, {"$push": {"dialogs": users_json}})
        mongo.db.users.update({"login": recipient}, {"$push": {"dialogs": users_json}})
        mongo.db.dialogs.insert_one(dialogs_json)
        return {'result': True, 'errorMessage': None, 'userInfo': {"dialogID": dialogID, "image": recipient_image, "login": recipient}}

# check for already existing dialog
def existing_dialog(sender, recipient):
    data = mongo.db.users.find_one({"login": sender})
    dialogs = data['dialogs']

    for dialog in dialogs:
        if dialog['login'] == recipient:
            return True

    return False

# send message
'''
Input: sender and recipient logins, message_text, dialog ID
Return: json doc with result description
'''
@api.route('/send_message', methods=['POST'])
def send_message():
    f = request.get_json()

    sender = f.get('sender')
    recipient = f.get('recipient')
    message_text = f.get('message')
    dialogID = f.get('dialogID')

    user_sender = mongo.db.users.find_one({"login": sender})
    image = user_sender['image']

    if mongo.db.users.find({"login": sender}) is None:
        return {'result': False, 'errorMessage': 'Not existing sender', 'userInfo': None}
    elif mongo.db.users.find({"login": recipient}) is None:
        return {'result': False, 'errorMessage': 'Not existing recipient', 'userInfo': None}
    elif message_text is None:
        return {'result': False, 'errorMessage': 'Null message', 'userInfo': None}
    else:
        message_json = {"login": sender, "message": message_text}
        mongo.db.dialogs.update({"_id": dialogID}, {"$push": {"messages": message_json}})
        dialog_json_sender = {"last_message": message_text, "id": dialogID, "photoID": image, "login": sender, "sender": sender}
        dialog_json_recipient = {"last_message": message_text, "id": dialogID, "photoID": image, "login": recipient, "sender": sender}
        mongo.db.users.update({"login": sender, "dialogs.id": dialogID}, {"$set": {"dialogs.$": dialog_json_recipient}})
        mongo.db.users.update({"login": recipient, "dialogs.id": dialogID}, {"$set": {"dialogs.$": dialog_json_sender}})
        return {'result': True, 'errorMessage': None, 'userInfo': None}

# curl --request POST --header 'Content-Type: application/json' --data '{"login": "Test", "password": "Test"}' 'http://127.0.0.1:5000/login'
# curl --request POST --header 'Content-Type: application/json' --data '{"sender": "Test", "recipient": "Test1", "message":"Hello, World!", "dialogID": 9290281645}' 'http://127.0.0.1:5000/send_message'