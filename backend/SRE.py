class SRE():
    """
    Class stores the main attributes of an SRE and provides methods to retrieve them
    
    An SRE has:
        - name: A first name
        - lastname: A last name
        - prefs: A list of Date class representing his preferences for a given quarter
        - pref_num: How many preferences an SRE has chosen
    """
    def __init__(self, prefs, name, lastname):
        self.name = name
        self.lastname = lastname
        self.prefs = prefs
        self.pref_num = len(prefs)
    
    def get_num_prefs(self):
        return self.pref_num
    
    def get_name(self):
        return self.name
    
    def get_lastname(self):
        return self.lastname
    
    def get_prefs(self):
        return self.prefs
