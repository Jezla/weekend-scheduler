import datetime

class Shift():
    """
    Class stores the main attributes of a Shift and offers methods to retireve them

    A shift has:
        - date: the datetime representation of the calendar date
        - workers: list of SREs that have been assigned to the shift
        - slots: How many slots a given shift has
    """
    def __init__(self, date, slots):
        self.date = date
        self.workers = []
        self.slots = slots
    
    def __eq__(self, other):
        return self.date == other.get_date()
    
    def assign_sre(self, sre):
        self.workers.append(sre)
    
    def get_date(self):
        return self.date
    
    def get_workers(self):
        return self.workers
    
    def get_slots(self):
        return self.slots
    
    def reduce_slots(self, val):
        self.slots -= val