import datetime
from pymongo import MongoClient

class databaseManager:
    def __init__(self):
        # self.cluster = MongoClient('mongodb://127.0.0.1:2717')
        self.cluster = MongoClient('mongodb://mymongo:27017')
        self.db = self.cluster['intsight-project']
        self.collection = self.db['pastes']

    # insert pastes
    # pastes should be array
    def insertPastes(self,pastes):
        try:
            self.collection.insert_many(pastes)
            return 204
        except:
            return 404

    # get all the pastes that inside the db
    def getAllPastes(self):
        return self.collection.find({})

    # check if a content is a copy
    def isaCopy(self,outsidePaste,outsidePastes=False):
        result = 'original'
        if outsidePastes == False:
            allPastes = self.getAllPastes()
        else:
            allPastes = outsidePastes
        for paste in allPastes:
            if paste['content'] == outsidePaste['content']:
                if outsidePaste['date'] - datetime.timedelta(minutes=1) < paste['date'] < outsidePaste['date'] + datetime.timedelta(minutes=1):
                    result = 'same'
                    break
                result = paste
        return result
