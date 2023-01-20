import datetime

class Shift():
    """
    Class stores the main attributes of a Shift and offers methods to retireve them

    A shift has:
        - date: the datetime representation of the calendar date
        - workers: list of SREs that have been assigned to the shift
    """
    def __init__(self, date):
        self.date = date
        self.workers = []
    
    def assign_sre(self, sre):
        self.workers.append(sre)
    
    def get_date(self):
        return self.date
    
    def get_workers(self):
        return self.workers