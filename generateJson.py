import json
import urllib2
import requests
import re
from bs4 import BeautifulSoup
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

url = 'https://en.wikipedia.org/wiki/List_of_cities_by_longitude'
request = urllib2.Request(url)
response = urllib2.urlopen(request, timeout=20)
content = response.read()
soup = BeautifulSoup(content, 'html.parser')


data = []
tables = soup.find_all('table', class_='wikitable')[1:]
for table in tables:
    trs = table.find_all('tr')[1:]
    for tr in trs:
        for td in tr.find_all('td'):
            print td.text





# table_body = table.find('tbody')
# print table_body
# rows = table_body.find_all('tr')
# for row in rows:
#     # cols = row.find_all('td')
#     # cols = [ele.text.strip() for ele in cols]
#     # data.append([ele for ele in cols if ele]) # Get rid of empty values
#     print


# example dictionary that contains data like you want to have in json
dic={'age': 100, 'name': 'mkyong.com', 'messages': ['msg 1', 'msg 2', 'msg 3']}

dic['age'] = 20

# get json string from that dictionary
data=json.dumps(dic)
print data




# f = open("cities.json",'wb')
# f.write(data)
# f.close()
