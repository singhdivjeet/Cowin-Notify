# -*- coding: utf-8 -*-
"""
Created on Sat May 15 19:20:50 2021

@author: mohap
"""


import requests

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}

def filterlist(y):
    for i in range(len(y)):
        if y[i]['min_age_limit'] != 18:
            y.pop(i)
      
    return y
    


def getdistrict(dist,day):
    try:
        parameters = { "district_id": dist, "date": day }
        response = requests.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict", params = parameters, headers = headers)
        x = response.json()['sessions']
        x = filterlist(x)
        if(response.status_code == 200 and len(x) and x[0]): 
            center = str(x[0]['name']) + ' in ' + str(x[0]['district_name'])
            return {'center': center, 'status': True}
        return {'status': False}
    except:
        print("Error Occured Sending dist: Code " + str(response.status_code))
        return {'status': False}
    
def getpin(pin,day):
    try:
        parameters = { "pincode": pin, "date": day }
        response = requests.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin", params = parameters, headers = headers)
        x = response.json()['sessions']
        x = filterlist(x)
        if(response.status_code == 200 and len(x)): 
            center = str(x[0]['name']) + ' in ' + str(x[0]['district_name'])
            return {'center': center, 'status': True}
        return {'status': False} 
    except:
        print("Error Occured Sending pin: Code " + str(response.status_code))
        return {'status': False}