from Shift import *
from SRE import *
import datetime
import heapq

list_dates = []

# Assigns SREs to dates
def assign_pref(shift, sre):
    for pref in sre.get_prefs():
        if (pref == shift.get_date() and shift.get_slots() != 0):
            shift.assign_sre(sre)
            shift.decrease_slots(1)
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