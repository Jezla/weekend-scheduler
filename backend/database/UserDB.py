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
    return cur.lastrowid

# Deletes a user from the database
# Parameters:
#   - conn: database connection object
#   - identifier: column name used to identify the user, e.g. "id"
#   - identifier_value: value of the identifier to match against, e.g. "5"
def delete_user(conn, identifier, identifier_value):
    sql = "DELETE FROM user WHERE " + identifier + " = ?" 
    cur = conn.cursor()
    cur.execute(sql, (identifier_value,) )
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
    sql = "UPDATE user SET " + column + " = ? WHERE " + identifier + " = ?"
    cur = conn.cursor()
    cur.execute(sql, (new_value, identifier_value))
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
    cur.execute(sql, (id,))
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

# Inserts a new user preference into the database
# Parameters: 
#   - conn: database connection object
#   - user_id: id of the user
#   - date: date of the preference in text format, e.g '05-07-2022'
#   - rank: rank of the date preference
def insert_user_preferences(conn, user_id, date, rank):
    sql = "INSERT INTO preference(user_id, date, rank) VALUES(?,?,?)"
    cur = conn.cursor()
    cur.execute(sql, (user_id, date, rank))
    conn.commit()
    return None

# Updates user preferences
# Parameters:
#   - conn: database connection object
#   - column: column name to update, e.g. "preferences_id"
#   - new_value: new value to set the column to
#   - identifier: column name used to identify the user, e.g. "id"
#   - identifier_value: value of the identifier to match against, e.g. "5"
def update_preference(conn, column, new_value, identifier, identifier_value):
    sql = "UPDATE preference SET " + column + " = ? WHERE " + identifier + " = ?"
    cur = conn.cursor()
    cur.execute(sql, (new_value, identifier_value))
    conn.commit()
    return None

# Retrieves a user's preferences based on user_id
# Parameters:
#   - conn: database connection object
#   - user_id: id of the user to retrieve
# Returns:
#   - rows: the retrieved user's preferences
def get_user_preferences(conn,user_id):
    sql = "SELECT * FROM preference WHERE user_id = ?"
    cur = conn.cursor()
    cur.execute(sql, (user_id,))
    conn.commit()
    rows = cur.fetchall()
    return rows

# Retrieves all user preferences
# Parameters:
#   - conn: database connection object
# Returns:
#   - rows: all user preferences
def get_all_user_preferences(conn):
    sql = "SELECT * FROM preference"
    cur = conn.cursor()
    cur.execute(sql)
    conn.commit()
    rows = cur.fetchall()
    return rows

# Deletes user preferences from the database
# Parameters:
#   - conn: database connection object
#   - identifier: column name used to identify the preference, e.g. "user_id"
#   - identifier_value: value of the identifier to match against, e.g. "5"
def delete_user_preferences(conn, identifier, identifier_value):
    sql = "DELETE FROM preference WHERE " + identifier + " = ?" 
    cur = conn.cursor()
    cur.execute(sql, (identifier_value,) )
    conn.commit()
    return None

def main():
    database = "pythonsqlite.db"

    sql_create_user_table = """ CREATE TABLE IF NOT EXISTS user (
                                    id integer PRIMARY KEY AUTOINCREMENT,
                                    first_name text NOT NULL,
                                    last_name text NOT NULL,
                                    allocated_shifts text,
                                    is_admin BOOLEAN DEFAULT false,
                                    UNIQUE(first_Name, last_name)
                                );"""
    
    sql_create_preference_table = """ CREATE TABLE IF NOT EXISTS preference (
                                    id integer PRIMARY KEY AUTOINCREMENT,
                                    user_id integer NOT NULL,
                                    date text CHECK (date like '__-__-____'),
                                    rank integer,
                                    FOREIGN KEY (user_id) REFERENCES user (id)
                                );"""
    

    # create a database connection
    conn = create_connection(database)

    # create tables
    if conn is not None:

        #create user table
        create_table(conn, sql_create_user_table)
        
        #create preferences table
        create_table(conn, sql_create_preference_table)

        #basic testing below

        #insert users and preferences
        #user_id = insert_user(conn, "Robert", "Bannayan")
        #user_id_2 = insert_user(conn, "John", "Smith")
        #insert_user_preferences(conn, user_id, "01-01-2023",1)
        #insert_user_preferences(conn, user_id, "02-01-2023",2)
        #insert_user_preferences(conn, user_id_2, "04-01-2023",1)
    
        #print("users in database initally")
        #print(get_all_users(conn))

        #delete and update user info
        #delete_user(conn, "first_name","Robert")
        #print(get_all_users(conn))
        #update_user(conn, "first_name", "William", "first_name","John")
        #print("users in database after modifications")
        #print(get_all_users(conn))

        #retrieve user preferences
        #print("user preferences")
        #print(get_all_user_preferences(conn))
        #print(get_user_preferences(conn,1))

        #update or delete user preferences
        #update_preference(conn, "rank", 5, "user_id",1)
        #print(get_user_preferences(conn,1))
        #delete_user_preferences(conn, "user_id", 1)
        #print(get_user_preferences(conn,1))

    else:
        print("Error! cannot create the database connection.")

if __name__ == '__main__':
    main()
    