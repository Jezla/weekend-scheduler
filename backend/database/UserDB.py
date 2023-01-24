from db import *

#Inserts a user into the database
#parameters are first and last name of the user
def insert_user(conn, first_name, last_name):
    sql = " INSERT INTO user(first_name,last_name) VALUES(?,?)"
    cur = conn.cursor()
    cur.execute(sql, (first_name, last_name))
    conn.commit()
    return None

#Deletes a user from the database
#identifier is how user is being identified, e.g by id
#identifier_target is the target of the identifier, ie. what it is trying to match against
def delete_user(conn, identifier, identifier_target):
    sql = "DELETE FROM user WHERE " + identifier + " = ?" 
    cur = conn.cursor()
    cur.execute(sql, identifier_target)
    conn.commit()
    return None

#Updates user data
#set is the value to be changed, e.g the user's preference
#setTarget is the value which set is to be changed to
#identifier is how user is being identified, e.g by id
#identifier_target is the target of the identifier, ie. what it is trying to match against
def update_user(conn, set, set_target, identifier, identifier_target):
    sql = "UPDATE user SET " + set + " = ? WHERE " + identifier + " = ?"
    cur = conn.cursor()
    cur.execute(sql)
    conn.commit()
    return None


def main():
    database = r"C:\sqlite\db\pythonsqlite.db"

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
        conn.commit()

        # create user table
        create_table(conn, sql_create_user_table)
        conn.commit()
       


    else:
        print("Error! cannot create the database connection.")

if __name__ == '__main__':
    main()
    