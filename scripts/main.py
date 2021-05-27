# -*- coding: utf-8 -*-
"""
Created on Sat May 15 12:21:06 2021

@author: mohap
"""
import emailalert
import api
import datetime
from pymongo import MongoClient


tomorrow = datetime.date.today() + datetime.timedelta(days=1)
tomorrow = tomorrow.strftime("%d-%m-%y")
today = datetime.date.today()
today = today.strftime("%d-%m-%y")
days = [today,tomorrow]
client = MongoClient()
email = []
db = client.covid19

for i in db.users.find():
    print("Checking slots for " + str(i['email']) + ' Pincode: ' + str(i['pin']) + ' District: ' +  str(i['district']))
    
    j = 0
    if('lastSent' in i.keys()):
        check = datetime.date.today() - i['lastSent'].date() >  datetime.timedelta(days=1)
        print('Last Sent before ' ,i['lastSent'].date())
    while(j<2 and check):
        ispin = api.getpin(i['pin'],days[j])
        isdist = api.getdistrict(i['district'],days[j])
        print(ispin['status'], isdist['status'])
        if ispin['status'] or isdist['status']:
            if ispin['status']: msg = ispin['center'] 
            else: msg = isdist['center']
            email.append({"email_id": i['email'],"msg": msg})
            break
        j += 1
        
emailalert.sendmail(email)
 
        

print(email)  
