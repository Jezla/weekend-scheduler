import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import {
  Button, FormControl, Stack, Typography, Switch, Alert, Snackbar, Grid, Box, Autocomplete, TextField
} from '@mui/material';
import SortableItem from '../components/SortableItem';
import ListView from '../components/ListView';

function Home() {
  const [name, setName] = useState("");
  const [view, toggleView] = useState(false) // Toggle between list and calendar view
  const [selectedDates, setSelectedDates] = useState([]);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [listDates, setListDates] = useState([]);
  const [nameList, setNameList] = useState(['Austin Lai', 'Alex jim Law', 'Adrian Lin']);
  const [openAlert, setOpenAlert] = useState(false);
  const [openSubmitAlert, setOpenSubmitAlert] = useState(false);
  const [openSubmitConfirm, setOpenSubmitConfirm] = useState(false);
  const [maxDate, setMaxDate] = useState(null)
  const [minDate, setMinDate] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      }
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setSelectedDates((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        console.log(arrayMove(items, activeIndex, overIndex));
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }

  useEffect(() => {
    // Get backend input for all valid weekends and public holidays
    // Fill listDates array
    // Get all employee names and fill nameList
    const getList = async () => {
      const resp = await fetch('http://localhost:5000/list', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      });
      const data = await resp.json()
      console.log(data)
      const dates = data.shifts.map(date => new Date(date))
      setListDates(dates)
      setNameList(data.users)

      if (dates[0]) {
        const quarters = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 0]];
        const quarter = quarters[quarters.indexOf(quarters.filter(l => l.indexOf(dates[0].getMonth()) !== -1)[0])]
        setCalendarDate(dates[0])
        setMinDate(new Date(dates[0].getFullYear(), quarter[0], 1))
        setMaxDate(new Date(dates[0].getFullYear(), quarter[2] + 1, 0))
      }
    }

    getList()
  }, [setMaxDate, setMinDate, name])

  const setDates = (date) => {
    setCalendarDate(date)
    if (selectedDates.length !== 12) {
      setSelectedDates([...selectedDates, date.toLocaleDateString()])
      return
    }
    setOpenAlert(true)
  }

  const setDisabled = (date) => {
    if (listDates.find(item => {return item.toLocaleDateString() === date.toLocaleDateString()})
        && !selectedDates.includes(date.toLocaleDateString())) {
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (selectedDates.length === 0 || name === "") {
      setOpenSubmitAlert(true)
      return
    }
    const nameSplit = name.split(' ')
    const firstname = nameSplit.shift()
    const lastname = nameSplit.join(" ");
    console.log(firstname, lastname, selectedDates)
    const resp = await fetch('http://localhost:5000/updateshift', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        'firstname': firstname,
        'lastname': lastname,
        'dates': selectedDates
      })
    });
    const data = await resp.json()
    console.log(data)
    setOpenSubmitConfirm(true)
  }

  return (
    <>
      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center">
        {/*<FormControl sx={{ m: 1, minWidth: 360 }}>
          <InputLabel>Select Name</InputLabel>
          <Select
            value={name}
            label="Select Name"
            onChange={(e) => setName(e.target.value)}
          >
            {nameList.map((name, index) => <MenuItem key={index} value={name}>{name}</MenuItem>)}
          </Select>
        </FormControl>*/}
        <Autocomplete
          disablePortal
          options={nameList.map(({name}) => name)}
          sx={{ m: 1, minWidth: 360 }}
          onChange={e => {
            const user = nameList.find(user =>  user.name === e.target.textContent)
            console.log(user)
            if (user !== undefined) {
              setSelectedDates(user.preferences)
            }
            setName(e.target.textContent)
          }}
          renderInput={params => <TextField {...params} label="Select Name"/>}
        />
        <FormControl>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>List</Typography>
            <Switch size="medium" checked={view} onChange={(e) => toggleView(e.target.checked)} />
            <Typography>Calendar</Typography>
          </Stack>
        </FormControl>
      </Grid>
      <div>
        {view ?
          <Calendar
            onChange={date => setDates(date)}
            value={calendarDate}
            minDate={minDate}
            maxDate={maxDate}
            minDetail="month"
            next2Label={null}
            prev2Label={null}
            tileDisabled={({ date }) => setDisabled(date)}
            showNeighboringMonth={false}
          />
          :
          <ListView
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            listDates={listDates}
          />

        }
        <Container className="p-3" style={{ "width": "50%", border: "1px solid #ccc", marginTop: '30px', marginBottom: '20px' }} align="center">
          <h3>Sort your preferences</h3>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={selectedDates} strategy={verticalListSortingStrategy}>
              {selectedDates.map(date => {
                return <SortableItem key={date} id={date} items={selectedDates} setItems={setSelectedDates} />
              }
              )}
            </SortableContext>
          </DndContext>
        </Container>
        <Box textAlign='center' sx={{ pb: 4 }}>
          <Button variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </div>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
        <Alert onClose={() => setOpenAlert(false)} severity="error" sx={{ width: '100%' }}>
          Maximum shifts selected!
        </Alert>
      </Snackbar>
      <Snackbar open={openSubmitAlert} autoHideDuration={6000} onClose={() => setOpenSubmitAlert(false)}>
        <Alert onClose={() => setOpenSubmitAlert(false)} severity="error" sx={{ width: '100%' }}>
          Check if name and at least one shift has been selected
        </Alert>
      </Snackbar>
      <Snackbar open={openSubmitConfirm} autoHideDuration={6000} onClose={() => setOpenSubmitConfirm(false)}>
        <Alert onClose={() => setOpenSubmitConfirm(false)} severity="success" sx={{ width: '100%' }}>
          Preferences have been submitted successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default Home;
