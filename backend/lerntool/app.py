from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime



app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

with app.app_context():
    db.create_all()

class StudyGroup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    min_participants = db.Column(db.Integer, nullable=False)
    max_participants = db.Column(db.Integer, nullable=False)
    meeting_time = db.Column(db.DateTime, nullable=False)
    duration = db.Column(db.DateTime, nullable=False) 
    location = db.Column(db.String(120), nullable=False)
    learning_method = db.Column(db.String(120), nullable=False)
    year_restriction = db.Column(db.String(50), nullable=False)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(30), nullable=False)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(30), nullable=False) 
    class_no = db.Column(db.String(5), nullable=False)
    year = db.Column(db.Integer, nullable=False)

@app.route('/groups', methods=['POST'])
def create_group():
    data = request.json
    
    new_group = StudyGroup(
        min_participants=data['min_participants'],
        max_participants=data['max_participants'],
        meeting_time=meeting_time,
        duration=duration,
        location=data['location'],
        learning_method=data['learning_method'],
        year_restriction=data['year_restriction']
    )
    
    db.session.add(new_group)
    db.session.commit()
    
    return jsonify({"message": "Study group created successfully", "id": new_group.id}), 201

@app.route('/register', methods=['POST'])
def create_user():
    data = request.json

    email_exists = User.query.filter_by(email=data['email']).first()
    if email_exists:
        return jsonify({'message': 'Email already exists'}), 400

    new_user = User(
        passwort=data['password'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        mail=data['email'],
        class_no=data['class_no'],
        year=data['year']
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully", "id": new_user.id}), 201

@app.route('/login', methods=['GET'])
def get_user():
    data = request.json

    user_exists = User.query.filter_by(password=data['password'], email=data['email']).first
    if(user_exists):
        return True
    else:
        return jsonify({'message': 'Email or Password incorrect'}), 400