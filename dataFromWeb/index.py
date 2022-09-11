from time import sleep
from scraper import getPastesInfo
from connections import db

isRunning = True

while isRunning:
    print(db.insertPastes(getPastesInfo()))
    sleep(120)