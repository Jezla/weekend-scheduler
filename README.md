## HOW TO LAUNCH APPLICATION

### Frontend
- After installing nodeJs with npm, go to frontend folder and type npm install to get the needed dependencies. Afterwards run npm start to run the frontend server
### Backend 
- Install the following dependencies with pip (pip install <dependency_name>:
  - flask
  - flask-cors
  - pandas
  - openpyxl
- Afterwards run python3 app.py to start the backend server (Note: If on the Windows VM run python app.py instead)

### MongoDB backend 
- Create database and insert connection string in '.env' file. 
- Run 'npm run dev'. 

### Login and Register 
- Run 'npm start'. 

# weekend-scheduler

## Goal
To design, deliver and present a bot - which will take input from a selection of options that an SRE will make based on their preferred days they are available to work on weekend shifts, and it will used to produce/create a schedule of the quarter’s weekend shifts based on defined rules/sort, then have the schedule be outputted to a csv file.


## Components/Objectives
Web Frontend: Where SREs enter how many shifts they would like for the quarter, and preferred dates.
Configurable Backend/Database hosted on a Ntnx cluster, that will store the following information: 
- Table for the web input
- Table for the SFDC shift info (slots available per each weekend day shift)
- Stored procedure to follow specific rules and allocate shifts out for the quarter (Requirements Gathering by Interns)
- Output would be a csv that we could ask the SFDC Team to upload and populate our shifts
- Document the creation process of bot and how it functions.

## Managers/SREs - requirements (Rules for sorting)
- Allow SREs with the minimal selected working weekend days to be placed first in their preferences.
- Have a variety of SREs skills based on a criteria.

## Roles for Project:
- Project Sponsor (Managers/Intern Mentor/SREs/Interns)
- Project Manager - Robert and Gabe
- Project Coordinator  - Wilson and Pattie
- Project Team Member - Zoheb, Austin, Adrian, Alex, Chris, Will

## Expected by end of internship
- Working Prototype of the “Bot”.
- Presentation of how the “Bot” works.
- High Concept documentation of the “Bot”.
- Documentation of each Interns contribution to the project.

