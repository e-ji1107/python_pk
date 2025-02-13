import os
import sys
import urllib.request
from dotenv import load_dotenv
load_dotenv()

client_id = os.environ.get("MY_ID")
client_secret = os.environ.get("MY_SECRET")

args = sys.argv

def pprin(word):

    encText = urllib.parse.quote(word)
    url = "https://openapi.naver.com/v1/search/news?query=" + encText +'&display=5&start=1&sort=sim'# JSON 결과
    # url = "https://openapi.naver.com/v1/search/blog.xml?query="" + encText # XML 결과
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id",client_id)
    request.add_header("X-Naver-Client-Secret",client_secret)
    response = urllib.request.urlopen(request)
    rescode = response.getcode()

if __name__ == "__main__":
    print(pprin(args[1]))

if(rescode==200):
    response_body = response.read()
    print(response_body.decode('utf-8'))
else:
    print("Error Code:" + rescode)