import json
import random
from flask import Blueprint
from flask import request
from lib.user import User
from lib.users import Users

api = Blueprint('app', __name__)
users = Users()
# authorisation
@api.route('/auth', methods=['GET', 'POST'])
def auth():
    if request.method == "POST":
        f = request.get_json()
        #print(f)
        return '200'
    else:
        return 'get'



@api.route('/registration', methods=['POST'])
def register():
    f = request.get_json()
    # Тут типа будет загрузка из пользователей из БД, ок да?
    login = f.get('login')
    password = f.get('password')
    
    user = users.find_by_login(login)
    if user == None:
        new_user = User(login, password)
        users.new_user(new_user)
        return {'result': True, 'errorMessage': 'None', 'userInfo': {"login": new_user.login, "password": new_user.password}}
    

    return {'result': False, 'errorMessage': 'Already existing user', 'userInfo': None}
# curl --request POST --header 'Content-Type: application/json' --data '{"login": "Loh", "password": "Pidr"}' 'http://127.0.0.1:5000/auth'