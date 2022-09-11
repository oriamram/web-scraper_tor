import requests
from bs4 import BeautifulSoup
from connections import db

with open('../tor.html', 'r') as f:
    tor_string = f.read()
# session = requests.session()
# session.proxies["http"] = "socks5h://localhost:9050"
# session.proxies["https"] = "socks5h://localhost:9050"
#http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all
# url = "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all"
# response = session.get(url)
soup = BeautifulSoup(tor_string, "html.parser")

def getPastesInfo():
    pastesObjs =[]
    for element in soup.select('#list > .row:not(:first-child):not(:last-child)'):
        pasteObj = {}
        pasteTitle = element.select('h4')[0].get_text().replace(u'\n',u' ').replace(u'\t',u'')
        pasteObj['title'] = pasteTitle
        authorPaste = element.select('.col-sm-6')[0].get_text().strip().split()
        authorName =''
        if len(authorPaste) == 9:
            authorName = authorPaste[2]
            pasteObj['author'] = authorName
        else:
            for cell in range(2,2+(len(authorPaste)-9)+1):
                authorName = authorName + ' '  + authorPaste[cell]
            pasteObj['author'] = authorName
        datePaste = element.select('.col-sm-6')[0].get_text().strip().split('at')[-1]
        pasteObj['date']=datePaste
        contentList = element.select('.text > ol > li')
        pasteContent = []
        for content in contentList:
            contentRow = content.select('div')[0].get_text().strip().replace('\n',' ').replace('\t','').replace('\xa0', ' ')
            if len(contentRow) > 0 :
                pasteContent.append(contentRow)
        pasteObj['content'] = '\n'.join(pasteContent)
        if db.isaCopy({**pasteObj,"content": pasteObj['content']},pastesObjs) == 'original' and db.isaCopy({**pasteObj,"content": pasteObj['content']}) == 'original':
            pastesObjs.append(pasteObj)
    return pastesObjs
