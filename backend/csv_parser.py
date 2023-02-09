import csv
from Shift import *
from datetime import datetime

def csv_parser(filename):
    """
    Reads the csv file containing shift information and creates a list of Shift objects
    """
    list_shifts = []
    list_dates = []
    headers = []

    path = "uploads/" + filename
    
    with open(path) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        prev_date = ""
        for row in csv_reader:
            #First line is header date
            if line_count == 0:
                headers.append(row)
            if line_count >= 1 and "AU-" in row[12]:
                # If we are not on the first line and the shift correspond to an AU shift
                # Grab the date and compare it to the previous date(initially a dummy date that should never be equal to anything)
                # If date matches previous then we are looking at an extra slot for our current shift.
                # If not then we are looking at a new shift.
                # Due to the file not having contiguos dates we may end up with duplicate shifts
                date = row[1]
                if(date != prev_date):
                    #If the current date is different than the previous date then we create a new shift
                    cur = Shift(datetime.strptime(date, "%d/%m/%y"), 1)
                    list_shifts.append(cur)
                    list_dates.append(datetime.strptime(date, "%d/%m/%y"))
                else:
                    cur.increase_slots(1)
                prev_date = date
            
            line_count += 1
    
    #list_dates = [x.strftime("%d/%m/%Y") for x in list_dates]
    
    list_shifts.sort(key=lambda x : x.get_date())
    list_dates.sort()
    
    # We need to remove duplicate shifts and convert then into extra slots for the corresponding day
    prev = Shift(datetime(1000,1,1), 0)
    duplicates = []
    for shift in list_shifts:
        if shift.get_date() == prev.get_date():
           duplicates.append(prev)
           shift.increase_slots(prev.get_slots())
        
        prev = shift
    
    for duplicate in duplicates:
        list_shifts.remove(duplicate)

    # The operation being performed over list_dates is to ensure that there are no duplicates
    return (list_shifts, list(set(list_dates)))
    

    
