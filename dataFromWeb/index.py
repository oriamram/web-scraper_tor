from time import sleep
from scraper import getPastesData
from connections import db

isRunning = True

while isRunning:
    print(db.insertPastes(getPastesData()))
    sleep(120)