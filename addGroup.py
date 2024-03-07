import requests
import json
from datetime import datetime

url = 'http://127.0.0.1:5000/creategroup'

group_data = {
    "name": "TestGruppe",
    "groupdatestart": datetime.now().strftime('%Y-%m-%d'),  
    "groupdateend": datetime.now() .strftime('%Y-%m-%d'),  
    "maxmembers": 10,
    "location": "Online",
    "description": "Testgruppe zum lernen",
    "learnmethod": "Gruppenarbeit",
    "thisyearonly": False
}

headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, data=json.dumps(group_data), headers=headers)

print(response.status_code)
print(response.json())
