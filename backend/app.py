from flask import Flask, jsonify, request


app = Flask(__name__)

# Members API Route

@app.route("/members")
def members():
  return {"members": ["Member1", "Member2", "Member3", "Member4"]}

# Endpoint to return a list of users
@app.route("/users", methods=["GET"])
def get_users():
    users = [{"id": 1, "name": "John Doe"}, {"id": 2, "name": "Jane Smith"}]
    return jsonify(users)

# Endpoint to add a new user
@app.route("/users", methods=["POST"])
def add_user():
    data = request.get_json()
    user = {"id": data["id"], "name": data["name"]}
    users.append(user)
    return jsonify({"message": "User added successfully."}), 201


# Endpoint to add a new user
@app.route("/shifts", methods=["POST"])
def add_user():
    data = request.get_json()

    # shift creation?

    return jsonify({"message": "shift created successfully."}), 201


@app.route("/users/<int:id>", methods=["PUT"])
def update_user(id):
    data = request.get_json()
    user = next((u for u in users if u["id"] == id), None)
    if user:
        user["name"] = data["name"]
        return jsonify({"message": "User updated successfully."})
    else:
        return jsonify({"message": "User not found."}), 404







if __name__ == "__main__":
  app.run(debug=True)