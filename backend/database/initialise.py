from db import *

def main():
    database = r"C:\sqlite\db\pythonsqlite.db"

    sql_create_user_table = """ CREATE TABLE IF NOT EXISTS users (
                                    id integer PRIMARY KEY,
                                    name text NOT NULL,
                                    preferences_id integer NOT NULL,
                                    FOREIGN KEY (preferences_id) REFERENCES preferences (id)
                                );"""
    
    sql_create_preferences_table = """ CREATE TABLE IF NOT EXISTS preferences (
                                    id integer PRIMARY KEY,
                                    dates Text,
                                    rank integer NOT NULL
                                );"""

    # create a database connection
    conn = create_connection(database)

    # create tables
    if conn is not None:
        # create projects table
        create_table(conn, sql_create_user_table)

        # create tasks table
        create_table(conn, sql_create_preferences_table)
    else:
        print("Error! cannot create the database connection.")

if __name__ == '__main__':
    main()