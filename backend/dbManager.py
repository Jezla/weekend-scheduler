from SRE import *
import UserDB
from datetime import datetime

class dbManager():

    def __init__(self,conn):
        self.conn = conn
    
    def add_user(self, SRE):
        return UserDB.insert_user(self.conn, SRE.get_id(),SRE.get_first_name(), SRE.get_last_name())
    
    def remove_user(self, SRE):
        UserDB.delete_user(self.conn, "id", SRE.get_id())

    def insert_preferences(self, SRE, prefs):
        SRE.set_prefs(prefs)
        rank = 1
        for pref in prefs:
            pref = pref.strftime('%d-%m-%Y')
            print(pref)
            UserDB.insert_user_preferences(self.conn, SRE.get_id(), pref,rank)
            rank = rank + 1

    def get_user_byid(self, id):
        SRE = UserDB.get_user_byid(self.conn, id)[0]
        preferences = self.get_user_preferences(SRE)
        SRE.set_prefs(preferences)
        return SRE

    def get_user_byname(self, first_name, last_name):
        SRE = UserDB.get_user_byname(self.conn, first_name, last_name)[0]
        preferences = self.get_user_preferences(SRE)
        SRE.set_prefs(preferences)
        return SRE

    def get_all_users(self):
        users = UserDB.get_all_users(self.conn)
        for sre in users:
            preferences = self.get_user_preferences(sre)
            sre.set_prefs(preferences)
        return users
            
    
    def get_user_preferences(self, SRE):
        pref = UserDB.get_user_preferences(self.conn, SRE.get_id())
        formatted_dates = [datetime.strptime(item[2], '%d-%m-%Y') for item in pref]
        sorted_dates = [x for _, x in sorted(zip(pref, formatted_dates), key=lambda pair: pair[0][3])]
        return sorted_dates

    def get_all_user_preferences(self):
        users = self.get_all_users()
        sre = users[0]
        preferences = []
        for sre in users:
            preferences.append((sre.get_id(),sre.get_first_name(), sre.get_last_name(),
             self.get_user_preferences(sre)))
        #return UserDB.get_all_user_preferences(self.conn)
        return preferences

    def delete_user_preferences(self, SRE):
        UserDB.delete_user_preferences(self.conn, "user_id", SRE.get_id())

    def update_user_prefererence(self, SRE, prefs):
        self.delete_user_preferences(SRE)
        self.insert_preferences(SRE, prefs)
        return None
