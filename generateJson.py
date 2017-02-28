import json
import urllib2
import requests
import re
import pprint
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
        start = 0
        detail = {}
        location = {}
        country = ''
        city = ''
        for td in tr.find_all('td'):
            if (start == 0):
                location['lng'] = str(td.text)
                print str(td.text)

            if (start == 1):
                location['lat'] = td.text.decode('utf8')
            if (start == 2):
                city = td.text.decode('utf8')
            if (start == 4):
                country = td.text.decode('utf8')
            start = start + 1

        detail['location'] = location
        detail['country'] = country
        detail['city'] = city
        data.append(detail)



            # print td.text
            # start = 0;

file=open('data.txt','w')
file.write(str(data));
file.close()
pprint.pprint(data)
# print data
>>>>>>> origin/master



# table_body = table.find('tbody')
# print table_body
# rows = table_body.find_all('tr')
# for row in rows:
#     # cols = row.find_all('td')
#     # cols = [ele.text.strip() for ele in cols]
#     # data.append([ele for ele in cols if ele]) # Get rid of empty values
#     print


# example dictionary that contains data like you want to have in json




# f = open("cities.json",'wb')
# f.write(data)
# f.close()
