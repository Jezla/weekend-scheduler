from db import *

# Inserts a new user into the database
# Parameters: 
#   - conn: database connection object
#   - first_name: first name of the user
#   - last_name: last name of the user
def insert_user(conn, first_name, last_name):
    sql = " INSERT INTO user(first_name,last_name) VALUES(?,?)"
    cur = conn.cursor()
    cur.execute(sql, (first_name, last_name))
    conn.commit()
    return None

# Deletes a user from the database
# Parameters:
#   - conn: database connection object
#   - identifier: column name used to identify the user, e.g. "id"
#   - identifier_value: value of the identifier to match against, e.g. "5"
def delete_user(conn, identifier, identifier_target):
    sql = "DELETE FROM user WHERE " + identifier + " = ?" 
    cur = conn.cursor()
    cur.execute(sql, identifier_target)
    conn.commit()
    return None

# Updates user data
# Parameters:
#   - conn: database connection object
#   - column: column name to update, e.g. "preferences_id"
#   - new_value: new value to set the column to
#   - identifier: column name used to identify the user, e.g. "id"
#   - identifier_value: value of the identifier to match against, e.g. "5"
def update_user(conn, column, new_value, identifier, identifier_value):
    sql = "UPDATE user SET " + set + " = ? WHERE " + identifier + " = ?"
    cur = conn.cursor()
    cur.execute(sql)
    conn.commit()
    return None

# Retrieves a user from the database based on their id
# Parameters:
#   - conn: database connection object
#   - id: id of the user to retrieve
# Returns:
#   - rows: the retrieved user's information
def get_user(conn,id):
    sql = "SELECT * FROM user WHERE id = ?"
    cur = conn.cursor()
    cur.execute(sql)
    conn.commit()
    rows = cur.fetchall()
    return rows

# Retrieves all users from the database
# Parameters:
#   - conn: database connection object
# Returns:
#   - rows: a list of all users' information
def get_all_users(conn):
    sql = "SELECT * FROM user"
    cur = conn.cursor()
    cur.execute(sql)
    conn.commit()
    rows = cur.fetchall()
    return rows




def main():
    database = "pythonsqlite.db"

    sql_create_user_table = """ CREATE TABLE IF NOT EXISTS user (
                                    id integer PRIMARY KEY AUTOINCREMENT,
                                    first_name text NOT NULL,
                                    last_name text NOT NULL,
                                    preferences_id integer,
                                    allocated_shifts Text ,
                                    FOREIGN KEY (preferences_id) REFERENCES preferences (id)
                                );"""
    
    sql_create_preference_table = """ CREATE TABLE IF NOT EXISTS preference (
                                    id integer PRIMARY KEY,
                                    dates Text,
                                    rank integer NOT NULL
                                );"""
    

    # create a database connection
    conn = create_connection(database)

    # create tables
    if conn is not None:
        
        # create preferences table
        create_table(conn, sql_create_preference_table)

        # create user table
        create_table(conn, sql_create_user_table)
       
    else:
        print("Error! cannot create the database connection.")

if __name__ == '__main__':
    main()
    