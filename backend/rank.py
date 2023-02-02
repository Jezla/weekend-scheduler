from Shift import *
from SRE import *
import datetime
import heapq
import pandas as pd

list_shifts = []

# Assigns SREs to dates
def assign_pref(shift, sre):
    pref_count = 6
    prefs = sre.get_prefs()
    for pref in prefs:
        if (pref == shift.get_date() and shift.get_slots() != 0):
            shift.assign_sre(sre)
            sre.assign_shift(shift.get_date())
            #sre.remove_pref(shift.get_date())
            if (sre.get_prio != 0): 
                sre.set_prio(0)
        elif (pref == shift.get_date() and shift.get_slots() == 0):
            sre.set_prio(6 + pref_count)    
            #sre.remove_pref(shift.get_date())
        
        pref_count -= 1

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
    
    # Second pass is to ensure that all sres have at least 6 shifts
    for shift in list_shifts:
        while len(sre_pq) != 0:
            sre = heapq.heappop(sre_pq)
            if shift.get_slots() != 0 and sre.get_num_shifts() < 6:
                shift.assign_sre(sre)
                sre.assign_shift(shift.get_date())
            heapq.heappush(done, sre)
        
        sre_pq = done
        done = []
    
    #Last pass is to ensure that no shifts have available slots
    for shift in list_shifts:
        while len(sre_pq) != 0:
            sre = heapq.heappop(sre_pq)
            if shift.get_slots() != 0:
                shift.assign_sre(sre)
                sre.assign_shift(shift.get_date())
            heapq.heappush(done, sre)
        
        sre_pq = done
        done = []
    
def csv_convert():
    file = pd.read_csv("SRE_Registtartion__c_-_APAC.csv")

    base = 0
    for shift in list_shifts:
        for sre in shift.get_workers():
            date = file.loc[base, 'Date__c']
            if date == shift.get_date().strftime("%d/%m/%Y"):
                file.loc[base, 'Registered_SRE__c'] = sre.get_id()
                base += 1
            else:
                break
    
    file.to_csv("final.csv", index=False)


def rank(shifts, sres):
    list_shifts = shifts
    #Iterate through list of shifts and through each sres preferences and assign shifts based on criteria
    iterate_pref(sres)
    #After this function is done we can iterate through the list of shifts and see which sre was assignd to it
    csv_convert(shifts)

if __name__ == "__main__":
  rank()