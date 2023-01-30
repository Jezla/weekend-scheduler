import SRE
import UserDB

class dbManager():

    currentSRE = SRE

    def __init__(self,conn, id=1):
        self.currentSRE = UserDB.get_user(conn, id)
        self.conn = conn
    
    def add_user(self, SRE):
        return UserDB.insert_user(self.conn, SRE.get_first_name(), SRE.get_last_name())
    
    def remove_user(self, SRE):
        UserDB.delete_user(self.conn, "user_id", SRE.get_id())

    def insert_preferences(self, SRE):
        preferences = SRE.get_prefs()
        rank = 1
        for pref in preferences:
            pref = pref.strftime('%d-%m-%Y')
            UserDB.insert_user_preferences(self.conn, SRE.get_id(), pref,rank)
            rank = rank + 1

    def get_user(self, id):
        return UserDB.get_user(self.conn, id)

    def get_all_users(self):
        return UserDB.get_all_users(self.conn)
    
    def get_user_preferences(self, SRE):
        return UserDB.get_user_preferences(self.conn, SRE.get_id())

    def get_all_user_preferences(self):
        return UserDB.get_all_user_preferences(self.conn)


    def delete_user_preferences(self, SRE):
        UserDB.delete_user_preferences(self.conn, "user_id", SRE.get_id())

    def update_user_prefererence(self):
        return None
