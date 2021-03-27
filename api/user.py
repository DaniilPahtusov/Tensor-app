from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin
from api import login_manager
from lib.database.db import mongo
from random import randint

@login_manager.user_loader
def load_user(user_id):
    data = mongo.db.users.find_one({"_id": user_id})
    user = User(data['login'])
    user.set_id(data['_id'])
    user.set_dialogs(data['dialogs'])
    
    return user

class User(UserMixin):
    def __init__(self, login):
        self.login = login
        self.id = randint(10000002, 99999999)
        while mongo.db.users.find({"_id": self.id}).count() != 0:
            self.id = randint(10000002, 99999999)
            print(self.id)
        self.dialogs = []

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def set_id(self, id):
        self.id = id

    def set_dialogs(self, dialogs):
        self.dialogs = dialogs