from Shift import *
from SRE import *
from datetime import datetime
import heapq
import csv

# Assigns SREs to dates
def assign_pref(shift, sre):
    for pref in sre.get_prefs():
        if (pref == shift.get_date() and shift.get_slots() != 0):
            shift.assign_sre(sre)
            shift.reduce_slots(1)
            sre.assign_shift(shift.get_date())
        elif (shift.get_slots() == 0):
            sre.set_prio(999)
            #sre.get_list_shifts().remove() Need to verify this line

    print("assigned")

# Sort the SRE list in ascending order based on number of preferences
def sorting_list(given_input):
    SRE_list = given_input
    return sorted(SRE_list, key=SRE.get_num_prefs())

# Iterate through the list of SRE preferences, assigning if a match is found
def iterate_pref(sorted_list):
    #list_shifts is a sorted list of shifts starting at the first shift and ending at the last one
    list_dates = []
    sre_pq = heapq.heapify(sorted_list)
    for shift in list_dates:
        for sre in sre_pq:
            assign_pref(shift, sre)

    return "sorted"


def csv_convert(sorted_content):

    filename = "SRE_Registtartion__c_-_APAC.csv"

    with open(filename, 'r') as csvfile:
        # Create a csv.reader object
        reader = csv.reader(csvfile)

        # Read the header row
        header = next(reader)

        # Check if "I" column already exists in the header
        if "I" in header:
            I_index = header.index("I")
        else:
            I_index = len(header)
            header.append("I")
        # Append the new column 'I' to the header 

        # Create a new list to store the modified data "Registered_SRE__c"
        registered_SREs = [header]

        # Iterate over the rows in the CSV file
        for row in reader:
            # Append the new value to the row
            if len(row) > I_index:
                row[I_index] = "New Value"
            else:
                row.append("New Value")
            registered_SREs.append(row)


    with open(filename, 'w', newline='') as csvfile:
        # Create a csv.writer object
        writer = csv.writer(csvfile)
        
        # Write the modified data to the CSV file
        writer.writerows(registered_SREs)

    print("done")


def get_input():

    return "random"


def main():
    #input
    given_input = get_input()

    sorted_list = sorting_list(given_input)

    sorted_content = iterate_pref(sorted_list)

    csv_convert(sorted_content)


if __name__ == "__main__":
  main()