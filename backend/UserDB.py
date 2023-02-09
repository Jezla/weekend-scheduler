from db import *
from SRE import *
from datetime import datetime
from dbManager import *

#This file defines functions that manipulate the db.

# Inserts a new user into the database
# Parameters: 
#   - conn: database connection object
#   - first_name: first name of the user
#   - last_name: last name of the user
def insert_user(conn, id, username, first_name, last_name):
    sql = " INSERT INTO user(id,username, first_name,last_name, priority) VALUES(?,?,?,?,0)"
    cur = conn.cursor()
    cur.execute(sql, (id, username, first_name, last_name))
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
def get_user_byid(conn,id):
    sql = "SELECT * FROM user WHERE id = ?"
    users = []
    cur = conn.cursor()
    cur.execute(sql, (id,))
    conn.commit()
    rows = cur.fetchall()
    for row in rows:
        id = row[0]
        username = row[1]
        first_name = row[2]
        last_name = row[3]
        pref = []
        if row[4] == None:
            allocated_shifts = []
        else:
            allocated_shifts = row[4].split(',')
        is_admin = row[5]
        priority = row[6]
        sre = SRE(id,username,pref, first_name, last_name,priority)
        for shift in allocated_shifts:
            shift = datetime.strptime(shift, '%d/%m/%Y')
            sre.assign_shift(shift)
        users.append(sre)
    return users

# Retrieves a user from the database based on their first and last name
# Parameters:
#   - conn: database connection object
#   - first_name: users first name
#   - last_name: users last name
# Returns:
#   - rows: the retrieved user's information
def get_user_byname(conn,first_name, last_name):
    sql = "SELECT * FROM user WHERE first_name = ? AND last_name = ?"
    users = []
    cur = conn.cursor()
    cur.execute(sql, (first_name,last_name))
    conn.commit()
    rows = cur.fetchall()
    for row in rows:
        id = row[0]
        username = row[1]
        first_name = row[2]
        last_name = row[3]
        pref = []
        if row[4] == None:
            allocated_shifts = []
        else:
            allocated_shifts = row[4].split(',')
        is_admin = row[5]
        priority = row[6]
        sre = SRE(id,username,pref, first_name, last_name,priority)
        for shift in allocated_shifts:
            shift = datetime.strptime(shift, '%d/%m/%Y')
            sre.assign_shift(shift)
        users.append(sre)
    return users

# Retrieves all users from the database
# Parameters:
#   - conn: database connection object
# Returns:
#   - rows: a list of all users' information
def get_all_users(conn):
    sql = "SELECT * FROM user"
    users = []
    cur = conn.cursor()
    cur.execute(sql)
    conn.commit()
    rows = cur.fetchall()
    for row in rows:
        id = row[0]
        username = row[1]
        first_name = row[2]
        last_name = row[3]
        pref = []
        if row[4] == None:
            allocated_shifts = []
        else:
            allocated_shifts = row[4].split(',')
        is_admin = row[5]
        priority = row[6]
        sre = SRE(id,username,pref, first_name, last_name,priority)
        for shift in allocated_shifts:
            shift = datetime.strptime(shift, '%d/%m/%Y')
            sre.assign_shift(shift)
        users.append(sre)
    return users
    

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

def init_db(conn):
    sql_create_user_table = """ CREATE TABLE IF NOT EXISTS user (
                                    id text PRIMARY KEY ,
                                    username text NOT NULL,
                                    first_name text NOT NULL,
                                    last_name text NOT NULL,
                                    allocated_shifts text,
                                    is_admin BOOLEAN DEFAULT false,
                                    priority integer,
                                    UNIQUE(first_name, last_name)
                                );"""
    
    sql_create_preference_table = """ CREATE TABLE IF NOT EXISTS preference (
                                    id integer PRIMARY KEY AUTOINCREMENT,
                                    user_id text NOT NULL,
                                    date text CHECK (date like '__/__/____'),
                                    rank integer,
                                    FOREIGN KEY (user_id) REFERENCES user (id)
                                );"""
    if conn is not None:

        #create user table
        create_table(conn, sql_create_user_table)
        
        #create preferences table
        create_table(conn, sql_create_preference_table)
    else:
        print("Error! cannot create the database connection.")



