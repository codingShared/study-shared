from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('localhost', 27018)
db = client.dbsparta

## HTML을 주는 부분
@app.route('/')
def home():
    return render_template('index.html')

## API 역할을 하는 부분
@app.route('/review', methods=['POST'])
def write_review():
    title_receive = request.form['title_give']
    author_receive = request.form['author_give']
    bookReview_receive = request.form['bookReview_give']
    doc = {
        'title' : title_receive,
        'author' : author_receive,
        'bookReview' : bookReview_receive
    }

    db.reviews.insert_one(doc);
    return jsonify({'msg': '리뷰 저장완료!'})


@app.route('/review', methods=['GET'])
def read_reviews():
    reviews = list(db.reviews.find({},{'_id':False}))
    return jsonify({'all_reviews': reviews})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)