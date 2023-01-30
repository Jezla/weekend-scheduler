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

    # PLACEHOLDER DATA PLS REPLACE WITH THE ACTUAL DATA
    # Date data array 
    new_data_B = [datetime(2023,1,1), datetime(2023,1,14), datetime(2023,1,15),datetime(2023,2,1),datetime(2023,2,5)]

    # Managers data array
    new_data_H = [datetime(2023,1,1)]

    # SRE's data array
    new_data_I = [datetime(2023,1,1), datetime(2023,1,14), datetime(2023,1,15),datetime(2023,2,1),datetime(2023,2,5)]

    # Open the CSV file for reading
    with open(filename, 'r') as f:
        # Create a CSV reader object
        reader = csv.reader(f)

        # Create a list to store the modified rows
        mod_rows = []

        # Iterate through the rows in the CSV file
        for i, row in enumerate(reader):
            # If this is the first row (the header), add it to the list without modification
            if i == 0:  
                mod_rows.append(row)
            else:

                # ONCE YOU GET THE DATA INTRODUCE ITERATING THROUGH EACH DATE AND ADDING EACH CORRESPONDING SRE

                # Replace the data in column B with the managers data
                row[2] = new_data_B[i-1]
                # Replace the data in column H with the managers data
                row[8] = new_data_H[i-1]
                # Replace the data in column I with the SRE's data
                row[9] = new_data_I[i-1]
                # Add the modified row to the list
                mod_rows.append(row)

    # Open the CSV file for writing
    with open(filename, 'w') as f:
        # Create a CSV writer object
        writer = csv.writer(f)

        # Write the modified rows to the CSV file
        for row in mod_rows:
            writer.writerow(row)

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
