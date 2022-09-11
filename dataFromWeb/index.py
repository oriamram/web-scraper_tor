from scraper import getPastesInfo
from connections import db

db.insertPastes(getPastesInfo())