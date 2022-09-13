from time import sleep
from scraper import getPastesData
import requests
from connections import db

isRunning = True

while isRunning:
    print('started scraping')
    insertStatus = db.insertPastes(getPastesData())
    if insertStatus == 204:
        requests.get('http://localhost:4000/bring_new_pastes')
    print(insertStatus)
    print('ended scraping')
    sleep(120)