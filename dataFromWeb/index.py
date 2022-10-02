from time import sleep
from scraper import getPastesData
import requests
from connections import db

isRunning = True
while isRunning:
    print('started scraping')
    try:
        insertStatus = db.insertPastes(getPastesData())
    except:
        insertStatus = 404
    if insertStatus == 204:
        requests.get('http://my-server:4000/api/bring_new_pastes')
        # host.docker.internal
        continue
    print(insertStatus)
    print('ended scraping')
    sleep(120)