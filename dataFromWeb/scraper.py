import json
import requests
import datetime
from bs4 import BeautifulSoup
from textblob import TextBlob
from connections import db


session = requests.session()
tagsFile = open('tags.json','r')
tagsData = json.load(tagsFile)

session.proxies["http"] = "socks5h://localhost:9050"
session.proxies["https"] = "socks5h://localhost:9050"
#http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists

url = "http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists"

isOnline = False
if isOnline:
    response = session.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
else:
    with open('../tor.html', 'r') as f:
        tor_string = f.read()
    soup = BeautifulSoup(tor_string, "html.parser")

# scraper returns array of pastes
def getPastesData():
    pastesArr=[]
    for pasteElement in soup.select('tr.odd,tr.even'):
        pasteObj={}
        # title
        pasteObj['title'] = pasteElement.select_one('td:first-child > a').get_text()
        # author
        pasteObj['author'] = pasteElement.select_one('td:nth-child(2)').get_text()
        # date
        dateInfo = pasteElement.select_one('td:last-child').get_text().split(' ')
        today = datetime.datetime.utcnow()
        if dateInfo[1].lower() == 'second' or dateInfo[1].lower()  == 'seconds':
            tdelta = datetime.timedelta(seconds=int(dateInfo[0]))
        elif dateInfo[1].lower() == 'minute' or dateInfo[1].lower()  == 'minutes':
            tdelta = datetime.timedelta(minutes=int(dateInfo[0]))
        elif dateInfo[1].lower() == 'hour' or dateInfo[1].lower()  == 'hours':
            tdelta = datetime.timedelta(hours=int(dateInfo[0]))
        elif dateInfo[1].lower()  == 'days' or dateInfo[1].lower()  == 'day':
            tdelta = datetime.timedelta(days=int(dateInfo[0]))
        elif dateInfo[1].lower()  == 'weeks' or dateInfo[1].lower()  == 'week':
            tdelta = datetime.timedelta(weeks=int(dateInfo[0]))    
        pasteObj['date'] = today - tdelta
        # content 
        url = pasteElement.select_one('td:first-child > a').get_attribute_list('href')[0].split('view')
        url[1] = '/raw' + url[1]
        url = 'view'.join(url)
        response = session.get(url)
        pasteObj['content'] = ' '.join(response.text.split())
        isalocalCopy = db.isaCopy(pasteObj,pastesArr)
        isaDbCopy = db.isaCopy(pasteObj)
        # sentiment analyzer
        pasteObj['polarity'] = analyzeSentiment(pasteObj['content'])
        pasteObj['tags'] = checkForTag(pasteObj['title'],pasteObj['content'])
        # appending
        if isalocalCopy == 'original' and isaDbCopy == 'original':
            pastesArr.append(pasteObj)
    return pastesArr
        
# str analyze
def analyzeSentiment(str):
    blob = TextBlob(str)
    return blob.polarity

# check if paste should use a tag
def checkForTag(title,content):
    tags = set()
    for tag in tagsData:
        for ref in tagsData[tag]:
            if ref in title.lower():
                tags.add(tag)
            if ref in content.lower():
                tags.add(tag)
    return [*tags]
