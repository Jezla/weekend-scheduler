from SRE import *
import UserDB
from datetime import datetime
from db import *

class dbManager():

    def __init__(self):
        self.conn = create_connection("pythonsqlite.db")
    
    """
    Adds a user to the database
        
    Parameters:
    - SRE: the user to add to the database
        
     """
    def add_user(self, SRE):
        UserDB.insert_user(self.conn, SRE.get_id(),SRE.get_first_name(), SRE.get_last_name())
    
    """
    Removes a user from the database
        
    Parameters:
     - SRE: the user to remove from the database
    """
    def remove_user(self, SRE):
        UserDB.delete_user(self.conn, "id", SRE.get_id())

    """
    Inserts user preferences into the database
        
    Parameters:
    - SRE: the user for whom to insert preferences
    - prefs: a list of datetime objects in order of the ranking
    """
    def insert_preferences(self, SRE, prefs):
        SRE.set_prefs(prefs)
        rank = 1
        for pref in prefs:
            pref = pref.strftime('%d-%m-%Y')
            UserDB.insert_user_preferences(self.conn, SRE.get_id(), pref,rank)
            rank = rank + 1
    """
    Retrieves a user from the database based on their id
        
    Parameters:
    - id: id of the user to retrieve
        
    Returns:
    - SRE: the retrieved user
    """
    def get_user_byid(self, id):
        SRE = UserDB.get_user_byid(self.conn, id)[0]
        preferences = self.get_user_preferences(SRE)
        SRE.set_prefs(preferences)
        return SRE

    """
    Retrieves a user from the database based on their id
        
    Parameters:
    - first_name: first name of the user
    - last_name: last name of the user
        
    Returns:
    - SRE: the retrieved user
    """
    def get_user_byname(self, first_name, last_name):
        SRE = UserDB.get_user_byname(self.conn, first_name, last_name)[0]
        preferences = self.get_user_preferences(SRE)
        SRE.set_prefs(preferences)
        return SRE

    """
    Retrieves all users from the database
    
    Returns:
    - users: list of all users as SRE objects
    """
    def get_all_users(self):
        users = UserDB.get_all_users(self.conn)
        for sre in users:
            preferences = self.get_user_preferences(sre)
            sre.set_prefs(preferences)
        return users
            
    
    """
    Retrieves a user's preferences from the database'
        
    Parameters:
    - SRE: The SRE to get the preferences from 
        
    Returns:
    - sorted_dates: The preferences in ranked order
    """
    def get_user_preferences(self, SRE):
        pref = UserDB.get_user_preferences(self.conn, SRE.get_id())
        formatted_dates = [datetime.strptime(item[2], '%d-%m-%Y') for item in pref]
        sorted_dates = [x for _, x in sorted(zip(pref, formatted_dates), key=lambda pair: pair[0][3])]
        return sorted_dates

    """
    Retrieves all user preferences
        
    Returns:
    - preferences: a list containing the preferences of each user with their name and id
    """
    def get_all_user_preferences(self):
        users = self.get_all_users()
        sre = users[0]
        preferences = []
        for sre in users:
            preferences.append((sre.get_id(),sre.get_first_name(), sre.get_last_name(),
             self.get_user_preferences(sre)))
        return preferences

    """
    Deletes a user from the database
        
    Parameters:
    - SRE: The SRE to delete     
    """
    def delete_user_preferences(self, SRE):
        UserDB.delete_user_preferences(self.conn, "user_id", SRE.get_id())

    """
    Updates a user's preferences
        
    Parameters:
    - SRE: The SRE to update the preferences for
    - prefs: a list of datetime objects in order of the ranking
    """
    def update_user_prefererence(self, SRE, prefs):
        self.delete_user_preferences(SRE)
        self.insert_preferences(SRE, prefs)

    """
    Allocates a users shifts in the database
        
    Parameters:
    - SRE: The SRE to allocate the shifts for
    - shifts: a list of datetime objects representing teh shifts
    """
    def allocate_shifts(self, SRE, shifts):
        assigned_shifts = []
        for shift in shifts:
            SRE.assign_shift(shift)
            shift = shift.strftime('%d-%m-%Y')
            assigned_shifts.append(shift)
        assigned_shifts = ','.join(assigned_shifts)
        UserDB.update_user(self.conn, "allocated_shifts", assigned_shifts, "id", SRE.get_id())
