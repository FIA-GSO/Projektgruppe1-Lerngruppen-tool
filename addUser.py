import requests

url = 'http://127.0.0.1:5000/register'
data = {
    'firstname': 'elias',
    'lastname': 'steiner',
    'email': 'eliassteiner@web.de',
    'password': 'hashed_password_here'
}

response = requests.post(url, json=data)

print(response.text)
