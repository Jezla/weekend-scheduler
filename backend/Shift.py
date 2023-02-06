import datetime

class Shift():
    """
    Class stores the main attributes of a Shift and offers methods to retireve them

    A shift has:
        - date: the datetime representation of the calendar date
        - workers: list of SREs that have been assigned to the shift
        - slots: How many slots a given shift has
        - manager: The Manager for the shift. Stored as an instance of the Manager class
    """
    def __init__(self, date, slots):
        self.date = date
        self.workers = []
        self.slots = slots
    
    def assign_sre(self, sre):
        self.workers.append(sre)
        self.slots -= 1
    
    def get_date(self):
        return self.date
    
    def get_workers(self):
        return self.workers
    
    def get_slots(self):
        return self.slots
    
    def decrease_slots(self, val):
        self.slots -= val
    
    def increase_slots(self, val):
        self.slots += val