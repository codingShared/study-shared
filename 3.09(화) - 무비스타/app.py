from pymongo import MongoClient

from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbsparta


# HTML 화면 보여주기
@app.route('/')
def home():
    return render_template('index.html')


# API 역할을 하는 부분
@app.route('/api/list', methods=['GET'])
def show_stars():
    stars = list(db.mystar.find({}, {'_id':False}).sort('like',-1))
    return jsonify({'all_star' : stars})


@app.route('/api/like', methods=['POST'])
def like_star():
    target_star = request.form['name_give']
    current_like = db.mystar.find_one({'name' : target_star})['like']
    new_like = current_like+1;
    db.mystar.update_one({'name' : target_star}, {'$set' : {'like' : new_like}})
    return jsonify({'msg': '좋아요 했습니다.'})


@app.route('/api/delete', methods=['POST'])
def delete_star():
    target_star = request.form['name_give']
    db.mystar.delete_one({'name' : target_star})
    return jsonify({'msg': '삭제되었습니다!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)