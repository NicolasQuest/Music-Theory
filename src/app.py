"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from datetime import datetime, timedelta


from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

from flask_cors import CORS
# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
app.url_map.strict_slashes = False


app.config["JWT_SECRET_KEY"] = os.getenv('JWT-KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=10)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=1)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
CORS(app)


# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


@app.route('/login', methods=['POST']
           )
def login():
    body = request.get_json(silent=True)
    if not body:
        return jsonify({'msg': 'Tenes que enviar un body'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'The email and password fields are required'}), 400
    if 'password' not in body:
        return jsonify({'msg': 'The email and password fields are required'}), 400

    user = User.query.filter_by(email=body['email']).first()
    if user is None:
        return jsonify({'msg': 'Email or password is incorrect'}), 400
    pass_correct = bcrypt.check_password_hash(user.password, body['password'])
    if pass_correct == False:
        return jsonify({'msg': 'Email or password is incorrect'}), 400

    access_token = create_access_token(identity=body['email'])
    return jsonify({'token': access_token, 'username': user.username})


@app.route('/register', methods=['POST'])
def register():
    body = request.get_json(silent=True)

    if not body:
        return jsonify({'msg': 'you have to send something'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'the email the password filed is obligatory'}), 400
    if 'password' not in body:
        return jsonify({'msg': 'the password filed is obligatory'}), 400

    new_user = User()
    new_user.email = body['email']
    new_user.username = body['username']
    new_user.password = bcrypt.generate_password_hash(
        body['password']).decode("utf-8")
    new_user.is_active = True

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': f'user {new_user.email} created correctly'}), 201


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"email": current_user})


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
