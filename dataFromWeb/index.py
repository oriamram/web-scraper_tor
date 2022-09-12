from time import sleep
from scraper import getPastesData
from connections import db

isRunning = True

while isRunning:
    print('started scraping')
    print(db.insertPastes(getPastesData()))
    print('ended scraping')
    sleep(120)