from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.dbsparta



# 여기에 코딩을 해서 meta tag를 먼저 가져와보겠습니다.


## HTML을 주는 부분
@app.route('/')
def home():
   return render_template('index.html')

@app.route('/memo', methods=['GET'])
def listing():
    all_memo = list(db.memo.find({},{'_id':False}))
    return jsonify({'all_memos': all_memo})

## API 역할을 하는 부분
@app.route('/memo', methods=['POST'])
def saving():
    url_receive = request.form['url_give']
    comment_receive = request.form['comment_give']

    url = url_receive

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url, headers=headers)

    soup = BeautifulSoup(data.text, 'html.parser')
    title = soup.select_one('meta[property="og:title"]')['content']
    desc = soup.select_one('meta[property="og:description"]')['content']
    image = soup.select_one('meta[property="og:image"]')['content']

    doc = {
        'url' : url,
        'title' : title,
        'image' : image,
        'desc' : desc,
        'comment' : comment_receive
    }

    db.memo.insert_one(doc)

    return jsonify({'msg':'저장 완료!'})

if __name__ == '__main__':
   app.run('0.0.0.0',port=5000,debug=True)