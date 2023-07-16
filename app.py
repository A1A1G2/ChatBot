from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
from export import ExportModel
import requests

app = Flask(__name__)

CORS(app)

export = None

@app.route("/", methods=['GET'])
@cross_origin()
def index():
    return  {'res': 'abc'}


@app.route("/chat", methods=['POST'])
@cross_origin()
def chatRoute():
    try:
        if(request != None and request.json != None and request.json['message'] != None):
            message = request.json['message']
            res = export.replyForGui(message)
    except:
        res ="Sorry. I can't understand you. Please tell me different way. :("
        
    return  {'res': res}


def chatFunc(message): 
    return "test response message"

if __name__ == "__main__":
    export = ExportModel(".")
    app.run(port=3000, debug=True)