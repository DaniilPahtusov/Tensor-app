import json
from flask import Flask
from flask import Flask, Blueprint
from flask_cors import CORS, cross_origin
from routes import api
from flask_pymongo import PyMongo
from lib.database.db import initialize_db
from lib.database.db import mongo

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config["MONGO_URI"] = "mongodb+srv://TED755:zeZhunek@cluster0.kydw1.mongodb.net/mydatabase?retryWrites=true&w=majority"

    app.register_blueprint(api, url_prefix='/')

    initialize_db(app)
    
    return app