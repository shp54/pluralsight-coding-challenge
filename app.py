
from flask import Flask, jsonify, request
import json

CSV_DATA = 'code_challenge_question_dump.csv'
data = {}
maxId = 0

def getDataFromFile():
    global maxId
    id = 0
    with open(CSV_DATA) as f:
        for line in f.readlines():
            if id == 0:
                id += 1
                continue
            [ question, answer, distractors ] = line.strip().split('|')
            data[id] = {
                "id": id,
                "question": question,
                "answer": answer,
                "distractors": distractors.split(',')
            }
            id += 1
    maxId = id


app = Flask(__name__)

@app.route('/questions', methods=['GET'])
def questions():
    results = [v for k, v in list(data.items())]
    return jsonify(results)

@app.route('/questions', methods=['POST'])
def create_questions():
    global maxId
    jsonData = json.loads(request.data.decode())
    data[maxId] = {
        "id": maxId,
        "question": jsonData['question'],
        "answer": jsonData['answer'],
        "distractors": jsonData['distractors']
    }
    newId = maxId
    maxId += 1
    return jsonify(data[newId])

@app.route('/questions/<id>', methods=['GET'])
def get_question(id):
    key = int(id)
    if key in data:
        return jsonify(data[key])
    else:
        return jsonify({ 'error': 'Tried to access nonexistent item' })

@app.route('/questions/<id>', methods=['PUT'])
def update_question(id):
    key = int(id)
    jsonData = json.loads(request.data.decode())
    if key in data:
        data[key].update({
            "question": jsonData['question'],
            "answer": jsonData['answer'],
            "distractors": jsonData['distractors'],
        })
        return jsonify(data[key])
    else:
       return jsonify({ 'error': 'Tried to access nonexistent item' }) 

@app.route('/questions/<id>', methods=['DELETE'])
def delete_question(id):
    key = int(id)
    return jsonify(data.pop(key, {}))

def main():
    getDataFromFile()
    app.run()

if __name__ == '__main__':
    main()