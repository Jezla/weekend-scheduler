from flask import Flask, jsonify, request, redirect
from csv_parser import *
from database.dbManager import *
from SRE import *
from rank import *

shifts = []

app = Flask(__name__)

# Members API Route

@app.route("/members")
def members():
  return {"members": ["Member1", "Member2", "Member3", "Member4"]}

# Endpoint to return a list of users and shifts
@app.route("/list", methods=["GET"])
def get_list():
    users = get_all_users()
    if not shifts:
        print("empty list")
    else:
        big_list = {'users': users,'shifts': shifts}

    return jsonify(big_list)



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
        person = SRE([], first_name,last_name, 0)
        add_user(person)

    return jsonify({"message": "SRE created successfully."}), 201

# Endpoint to creating shifts (assuming this is only run once)
@app.route("/addshift", methods=["POST"])
def add_shift():
    data = request.get_json()
    # shift creation from a csv file 
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        shifts, list_dates = csv_parser(file)


    return jsonify({"message": "shift created successfully."}), 201

@app.route("/updateshift", methods=["PUT"])
# Endpoint for updating shifts
def update_shift():
    data = request.get_json()
    #update the SRE shift preference
    if request.method == 'PUT':

        # updating
        

    return jsonify({"message": "shift updated successfully."}), 201


@app.route("/final", methods=["GET"])
# Endpoint for getting final SRE shift csv
def get_final():
    data = request.get_json()
    something = "sorted"
    csv = csv_convert(something)
    return jsonify(csv)


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
  app.run(debug=True)