from flask import Flask, jsonify, request


app = Flask(__name__)

# Members API Route

@app.route("/members")
def members():
  return {"members": ["Member1", "Member2", "Member3", "Member4"]}

<<<<<<< HEAD
# Endpoint to return a list of users and shifts
@app.route("/list", methods=["GET"])
def get_list():
    users = "list of all shifts and SREs"
    return jsonify(users)

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
    # SRE creation from a csv file
    return jsonify({"message": "SRE created successfully."}), 201

# Endpoint to creating shifts
def add_shift():
    data = request.get_json()
    # shift creation from a csv file
    return jsonify({"message": "shift created successfully."}), 201

# Endpoint for updating shifts
def update_shift():
    data = request.get_json()
    #update the SRE shift preference
    return jsonify({"message": "shift updated successfully."}), 201


# Endpoint for getting final SRE shift csv
def get_final():
    data = request.get_json()
    csv = "generated final csv"
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






=======
>>>>>>> csv_parser

if __name__ == "__main__":
  app.run(debug=True)