from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
import pymysql


pymysql.install_as_MySQLdb()
import MySQLdb
#import config.config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__, instance_relative_config=False)
    #TODO
    app.config.from_object('config.config.Config')
    db.init_app(app)

    with app.app_context():
        from routes.api import api
        from routes.api_persona import api_persona
        from routes.api_rol import api_rol
        from routes.api_producto import api_producto
        from routes.api_lote import api_lote
        app.register_blueprint(api)
        app.register_blueprint(api_persona)
        app.register_blueprint(api_rol)
        app.register_blueprint(api_producto)
        app.register_blueprint(api_lote)

        @app.route('/imagenes/<filename>')
        def imagenes(filename):
            return send_from_directory('imagenes', filename)
        # Creacion de tablas en la base de datos
        db.create_all()
        #db.drop_all()
    return app
