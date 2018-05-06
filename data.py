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

def getItem(id):
    key = int(id)
    if key in data:
        return data[key]
    else:
        return { 'error': 'Tried to access nonexistent item' }

def getItemMatching(search):
    return [v for k, v in list(data.items()) if search.lower() in v['question'].lower()]

def getAllItems():
    return [v for k, v in list(data.items())]

def createItem(jsonData):
    global maxId
    data[maxId] = {
        "id": maxId,
        "question": jsonData['question'],
        "answer": jsonData['answer'],
        "distractors": jsonData['distractors']
    }
    newId = maxId
    maxId += 1
    return data[newId]

def updateItem(id, jsonData):
    key = int(id)
    if key in data:
        data[key].update({
            "question": jsonData['question'],
            "answer": jsonData['answer'],
            "distractors": jsonData['distractors'],
        })
        return data[key]
    else:
       return { 'error': 'Tried to access nonexistent item' }

def deleteItem(id):
    key = int(id)
    return data.pop(key, {})

