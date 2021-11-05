from flask_restful import Api
from flask import Flask
import os
from Main.Routes.routes import initialize_routes
from config import Config


app = Flask(__name__)
app.config.from_object(Config)
api = Api(app)


app.config['MONGODB_SETTINGS'] = {
    'host': Config.DB
}

from Main.DAC.config import initialize_db
initialize_db(app)
initialize_routes(api)