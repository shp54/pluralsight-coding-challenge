from flask import Flask, jsonify, request
import json
import data

app = Flask(__name__)

@app.route('/questions', methods=['GET'])
def questions():
    results = data.getAllItems()
    return jsonify(results)

@app.route('/questions', methods=['POST'])
def create_questions():
    jsonData = json.loads(request.data.decode())
    result = data.createItem(jsonData)
    return jsonify(result)

@app.route('/questions/<id>', methods=['GET'])
def get_question(id):
    return jsonify(data.getItem(id))

@app.route('/questions/<id>', methods=['PUT'])
def update_question(id):
    jsonData = json.loads(request.data.decode())
    return jsonify(data.updateItem(id, jsonData))

@app.route('/questions/<id>', methods=['DELETE'])
def delete_question(id):
    return jsonify(data.deleteItem(id))

def main():
    data.getDataFromFile()
    app.run()

if __name__ == '__main__':
    main()