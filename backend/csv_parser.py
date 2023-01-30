import csv
from Shift import *
from datetime import datetime


def csv_parser(file):
    """
    Reads the csv file containing shift information and creates a list of Shift objects
    """
    list_shifts = []
    list_dates = []
    headers = []
    with open(file) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        prev_date = ""
        for row in csv_reader:
            if line_count == 0:
                headers.append(row)
            if line_count >= 1:
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
        
        return (list_shifts, list_dates)
    
if __name__ == "__main__":
    shifts, dates = csv_parser("test.txt")
    
    print(dates)
    for shift in shifts:
        print(shift.get_slots())
        print(shift.get_date())
    
