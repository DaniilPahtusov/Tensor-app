import json
from flask import Flask
from flask import Flask, Blueprint
from flask_cors import CORS, cross_origin
from flask_login import LoginManager
from flask_pymongo import PyMongo
from lib.database.db import initialize_db
from lib.database.db import mongo
import uuid

login_manager = LoginManager()
from routes import api

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SECRET_KEY'] = '43af25e2-3fb9-4bb6-a5a4-026d05cd7b75'
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config["MONGO_URI"] = "mongodb+srv://TED755:zeZhunek@cluster0.kydw1.mongodb.net/mydatabase?retryWrites=true&w=majority"

    app.register_blueprint(api, url_prefix='/')

    initialize_db(app)
    login_manager.init_app(app)
    return app