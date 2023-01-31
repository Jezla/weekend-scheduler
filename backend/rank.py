from Shift import *
from SRE import *
import datetime
import heapq
import csv

list_shifts = []

# Assigns SREs to dates
def assign_pref(shift, sre):
    pref_count = 6
    prefs = sre.get_prefs()
    for pref in prefs:
        if (pref == shift.get_date() and shift.get_slots() != 0):
            shift.assign_sre(sre)
            sre.assign_shift(shift.get_date())
            sre.remove_pref(shift.get_date())
        elif (pref == shift.get_date() and shift.get_slots() == 0):
            sre.set_prio(6 + pref_count)    
            sre.remove_pref(shift.get_date())
        
        pref_count -= 1
            
    print("assigned")

# Sort the SRE list in ascending order based on number of preferences
def sorting_list(given_input):
    SRE_list = given_input
    return sorted(SRE_list, key=SRE.get_num_prefs())

# Iterate through the list of SRE preferences, assigning if a match is found
def iterate_pref(sorted_list):
    sre_pq = heapq.heapify(sorted_list)
    done = []
    # First pass tries to match every SRE to their preferences
    for shift in list_shifts:
        while len(sre_pq) != 0:
            sre = heapq.heappop(sre_pq)
            assign_pref(shift, sre)
            heapq.heappush(done, sre)
        
        sre_pq = done
        done = []
    
    # Second pass is to ensure that all slots are filled
    for shift in list_shifts:
        while len(sre_pq) != 0:
            sre = heapq.heappop(sre_pq)
            if shift.get_slots() != 0:
                shift.assign_sre(sre)
            heapq.heappush(done, sre)
        
        sre_pq = done
        done = []
    
    return "sorted"

def csv_convert(sorted_content):
    print("done")
    f = open('random.csv', 'w')
    writer = csv.writer(f)

    #iterate to write rows
    writer.writerow(sorted_content)
    f.close()

    return f

def rank(shifts, sres):
    #Iterate through list of shifts and through each sres preferences and assign shifts based on criteria
    iterate_pref(sres)
    #After this function is done we can iterate through the list of shifts and see which sre was assignd to it
    csv_convert(shifts)


if __name__ == "__main__":
  rank()