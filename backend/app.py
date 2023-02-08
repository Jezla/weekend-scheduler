from flask import Flask, jsonify, request, redirect, make_response, Response, send_file
from os import *
from flask_cors import CORS
from csv_parser import *
from dbManager import *
from SRE import *
from rank import *
from db import *
import pandas as pd
from datetime import datetime

shifts = []
dates = []
filename = ""
UPLOAD_FOLDER = path.join(getcwd(), "uploads")

db = dbManager()

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
CORS(app)

# Endpoint to return a list of users and shifts
@app.route("/list", methods=["GET"])
def get_list():
    global dates, shifts
    sres = db.get_all_users()
    user_list = []
    if not shifts or not dates:
        print("empty list")
    for sre in sres:
        tmp = {'name': sre.get_first_name() + ' ' + sre.get_last_name(), 'preferences': [pref.strftime("%d/%m/%Y") for pref in sre.get_prefs()]}
        user_list.append(tmp)

    resp = {'users': user_list, 'shifts': dates}
    return resp


# Endpoint to add a new user
#@app.route("/users", methods=["POST"])
#def add_user():
#    data = request.get_json()
#    user = {"id": data["id"], "name": data["name"]}
#    users.append(user)
#    return jsonify({"message": "User added successfully."}), 201

# Endpoint to creating SREs
@app.route("/sre", methods=["POST"])
def add_sre():
    data = request.get_json()
    # unique SRE creation from a csv file (or admin panel??)
    if request.method == 'POST':
        last_name = data["last_name"]
        first_name = data["first_name"]
        id = first_name + " " + last_name
        person = SRE(id,[],first_name,last_name, 0)
        db.add_user(person)

    return jsonify({"message": "SRE created successfully."}), 201

# Endpoint for parsing the sre list from the managers
@app.route("/srelist", methods=["POST"])
def get_sres():
    if request.method == 'POST':
        if 'file' not in request.files:
            print('No file part')
            return redirect(request.url)

        file = request.files['file']
        if file.filename == '':
            print("No selected file")
            return redirect(request.url)

        data = pd.read_excel(file, engine="openpyxl")
        for index, row in data.iterrows():
            #print(row)
            db.add_user(SRE(row['User ID'], row['Username'], [], row['First Name'], row['Last Name'], 0))

        return  jsonify({"message": "sres created successfully."}), 201

# Endpoint to creating shifts (assuming this is only run once)
@app.route("/addshift", methods=["POST"])
def add_shift():
    # shift creation from a csv file
    if request.method == 'POST':
        if 'file' not in request.files:
            print('No file part')
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            print('No selected file')
            return redirect(request.url)
        if not path.exists(app.config["UPLOAD_FOLDER"]):
            mkdir(app.config["UPLOAD_FOLDER"])
        file.save(path.join(app.config["UPLOAD_FOLDER"], file.filename))
        global shifts, dates
        global filename
        filename = file.filename
        shifts, dates = csv_parser(file.filename)

    return jsonify({"message": "shift created successfully."}), 201

@app.route("/updateshift", methods=["PUT"])
# Endpoint for updating shifts
def update_shift():
    data = request.get_json()
    #update the SRE shift preference
    if request.method == 'PUT':
        # finding user in database
        person = db.get_user_byname(data['firstname'], data['lastname'])

        # changing their shift preferences
        print(data["dates"])
        db.update_user_prefererence(person, [datetime.strptime(x, "%d/%m/%Y") for x in data["dates"]])

    return jsonify({"message": "shift updated successfully."}), 201

@app.route("/final", methods=["GET"])
# Endpoint for getting final SRE shift csv
def get_final():
    global filename
    #data = request.get_json()
    sres = db.get_all_users()
    rank(shifts, sres, filename)
    return send_file(path.join(getcwd(), "uploads", "final.csv"), as_attachment=True, download_name="shifts.csv")

# @app.route("/users/<int:id>", methods=["PUT"])
# def update_user(id):
#     data = request.get_json()
#     user = next((u for u in users if u["id"] == id), None)
#     if user:
#         user["name"] = data["name"]
#         return jsonify({"message": "User updated successfully."})
#     else:
#         return jsonify({"message": "User not found."}), 404


if __name__ == "__main__":
  app.secret_key = urandom(24)
  app.run(host="0.0.0.0",debug=True)
