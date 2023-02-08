from Shift import *
from SRE import *
from datetime import datetime
import heapq
import pandas as pd

list_shifts = []

# Assigns SREs to dates
def assign_pref(shift, sre):
    pref_count = 12
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
def iterate_pref(sres):
    heapq.heapify(sres)
    done = []
    # First pass tries to match every SRE to their preferences
    for shift in list_shifts:
        while len(sres) != 0:
            sre = heapq.heappop(sres)
            assign_pref(shift, sre)
            heapq.heappush(done, sre)
        
        sres = done
        done = []
    
    # Second pass is to ensure that all sres have at least 6 shifts
    for shift in list_shifts:
        while len(sres) != 0:
            sre = heapq.heappop(sres)
            if shift.get_slots() != 0 and sre.get_num_shifts() < 6:
                shift.assign_sre(sre)
                sre.assign_shift(shift.get_date())
            heapq.heappush(done, sre)
        
        sres = done
        done = []
    
    #Last pass is to ensure that no shifts have available slots
    for shift in list_shifts:
        while len(sres) != 0:
            sre = heapq.heappop(sres)
            if shift.get_slots() != 0:
                shift.assign_sre(sre)
                sre.assign_shift(shift.get_date())
            heapq.heappush(done, sre)
        
        sres = done
        done = []
    
def csv_convert(filename):
    file = pd.read_csv("uploads/" + filename)
    
    global list_shifts
    
    # CSV file does not have contiguos dates(i.e. same date may be separate from the other dates)
    # Assumes that the list of shifts has no duplicates
    for base in range(file.shape[0]):
        date = file.loc[base, 'Date__c']
        region = file.loc[base, 'UserSubRegion__c']
        if region == "AU-Sydney":
            for shift in list_shifts:
                if shift.get_date() == datetime.strptime(date,"%d/%m/%y") and len(shift.get_workers()) != 0:
                    sre = shift.get_workers()[0]
                    file.loc[base, 'Registered_SRE__c'] = sre.get_first_name()
                    shift.get_workers().remove(sre)
                    

    file.to_csv("uploads/final.csv", index=False, mode="w")


def rank(shifts, sres, filename):
    global list_shifts
    list_shifts = shifts
    #Iterate through list of shifts and through each sres preferences and assign shifts based on criteria
    iterate_pref(sres)
    #After this function is done we can iterate through the list of shifts and see which sre was assignd to it
    csv_convert(filename)

if __name__ == "__main__":
  rank()