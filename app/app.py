import json
from flask import Flask
from flask import Flask, Blueprint
from flask_cors import CORS, cross_origin
from routes import api
# from flask_pymongo import PyMongo

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'

    app.register_blueprint(api, url_prefix='/')

    return app