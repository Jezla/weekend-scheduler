class SRE():
    """
    Class stores the main attributes of an SRE and provides methods to retrieve them
    
    An SRE has:
        - name: A first name
        - lastname: A last name
        - prefs: A list of datetime objects representing his preferences for a given quarter
        - pref_num: How many preferences an SRE has chosen
        - list_shifts: List of datetime objects representing the shifts they have been assigned
        - prio: The priority the SRE has for next pick. Increases once we fail to assign a preference to him
    """
    def __init__(self,id, prefs, first_name,last_name, prio):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.prefs = prefs
        self.pref_num = len(prefs)
        self.list_shifts = []
        self.prio = 0
    
    def __lt__(self, other):
        """
        This method is here to make the SREs able to be sorted by number of prefs by the priority queue
        Code from this link:
        https://stackoverflow.com/questions/8875706/heapq-with-custom-compare-predicate
        """
        return (self.get_num_prefs() - self.prio) <= (other.get_num_prefs() - other.get_prio())
    
    def get_num_prefs(self):
        return self.pref_num
    
    def get_first_name(self):
        return self.first_name

    def get_last_name(self):
        return self.last_name
    
    def get_prefs(self):
        return self.prefs
    
    def get_list_shifts(self):
        return self.list_shifts
    
    def get_num_shifts(self):
        return len(self.list_shifts)
    
    def get_prio(self):
        return self.prio
    
    def get_id(self):
        return self.id
    
    def set_id(self, id):
        self.id = id

    def assign_shift(self, date):   
        self.list_shifts.append(date)
    
    def set_prio(self, val):
        self.prio = val
    
    def set_prefs(self, pref):
        self.prefs = pref
    
    def remove_pref(self, val):
        self.prefs.remove(val)

