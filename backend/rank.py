from Shift import *
from SRE import *
import datetime

# Assigns SREs to dates
def assign_pref(a_date):
    print("assigned", a_date)

# Sort the SRE list in ascending order based on number of preferences
def sorting_list(given_input):
    SRE_list = given_input
    return sorted(SRE_list, key=SRE.get_num_prefs())

# Iterate through the list of SRE preferences, assigning if a match is found
def iterate_pref(sorted_list):
    #list_dates is a sorted list of dates starting at the first shift and ending at the last one
    list_dates = []
    for date in list_dates:
        assign_pref(date)

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