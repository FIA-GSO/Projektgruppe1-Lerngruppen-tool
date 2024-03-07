from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime



app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

#Klassendefinitionen

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    groupdatestart = db.Column(db.Date, nullable=False)
    groupdateend = db.Column(db.Date, nullable=False)
    maxmembers = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(128), nullable=False)
    description = db.Column(db.Text, default='')
    learnmethod = db.Column(db.String(128), default='')
    thisyearonly = db.Column(db.Boolean, default=False)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(30), nullable=False)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(30), nullable=False) 
    class_no = db.Column(db.String(5), nullable=False)
    year = db.Column(db.Integer, nullable=False)

class Membership(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), primary_key=True)
    is_owner = db.Column(db.Boolean, default=False)
    user = db.relationship('User', back_populates='groups')
    group = db.relationship('Group', back_populates='members')

Group.members = db.relationship('Membership', back_populates='group')
User.groups = db.relationship('Membership', back_populates='user')

#Programmierung für Gruppen basierte Querys

@app.route('/creategroup', methods=['POST'])
def create_group():
    data = request.get_json()
    try:
        new_group = Group(
            name=data['name'],
            groupdatestart=datetime.strptime(data['groupdatestart'], '%Y-%m-%d').date(),
            groupdateend=datetime.strptime(data['groupdateend'], '%Y-%m-%d').date(),
            maxmembers=data['maxmembers'],
            location=data['location'],
            description=data.get('description', ''),
            learnmethod=data.get('learnmethod', ''),
            thisyearonly=data['thisyearonly']
        )
        db.session.add(new_group)
        db.session.commit()
        
        return jsonify({"Erfolgreich, groupid": new_group.id}), 201
    except Exception as e:
        return jsonify({"error": "Creating group failed", "message": str(e)}), 500

# get all groups from database http://127.0.0.1:5000/getGroups
    
@app.route('/group', methods=['GET'])
def get_groups():
    all_groups = Group.query.all()
    groups_list = []
    for group in all_groups:
        groups_list.append({
            "id": group.id,
            "name": group.name,
            "groupdatestart": group.groupdatestart.strftime('%Y-%m-%d'),
            "groupdateend": group.groupdateend.strftime('%Y-%m-%d'),
            "maxmembers": group.maxmembers,
            "location": group.location,
            "description": group.description,
            "learnmethod": group.learnmethod,
            "thisyearonly": group.thisyearonly
        })
    return jsonify(groups_list)

#Programmierung für User basierte Querys

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

with app.app_context():
    db.create_all()
    
if __name__ == '__main__':
    app.run(debug=True)