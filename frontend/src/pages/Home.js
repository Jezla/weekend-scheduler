import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import {
  Button, InputLabel, MenuItem, FormControl, Select, Stack, Typography, Switch, Alert, Snackbar, Grid, Box
} from '@mui/material';

import SortableItem from '../components/SortableItem';
import ListView from '../components/ListView';

function Home() {
  const [name, setName] = useState("");
  const [view, toggleView] = useState(false) // Toggle between list and calendar view
  const [selectedDates, setSelectedDates] = useState([]);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [listDates, setListDates] = useState([
    new Date(2023, 1, 4),
    new Date(2023, 1, 5),
    new Date(2023, 1, 11),
    new Date(2023, 1, 12),
    new Date(2023, 1, 18),
    new Date(2023, 1, 19),
    new Date(2023, 1, 25),
    new Date(2023, 1, 26),
    new Date(2023, 2, 4),
    new Date(2023, 2, 5),
    new Date(2023, 2, 11),
    new Date(2023, 2, 12),
    new Date(2023, 2, 18),
    new Date(2023, 2, 19),
    new Date(2023, 2, 25),
    new Date(2023, 2, 26),
    new Date(2023, 3, 1),
    new Date(2023, 3, 2),
    new Date(2023, 3, 8),
    new Date(2023, 3, 9),
    new Date(2023, 3, 15),
    new Date(2023, 3, 16),
    new Date(2023, 3, 22),
    new Date(2023, 3, 29),
    new Date(2023, 3, 30),
  ]);
  const [nameList, setNameList] = useState(['Austin Lai', 'Alex Law', 'Adrian Lin']);
  const [openAlert, setOpenAlert] = useState(false);
  const [openSubmitAlert, setOpenSubmitAlert] = useState(false);


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
  }, [])

  const setDates = (date) => {
    setCalendarDate(date)
    if (selectedDates.length !== 6) {
      setSelectedDates([...selectedDates, date.toLocaleDateString()])
      return
    }
    setOpenAlert(true)
  }

  const setDisabled = (date) => {
    // TODO: add check for valid dates and public holidays (take from list date input)
    if ((date.getDay() !== 0 &&
      date.getDay() !== 6) ||
      selectedDates.includes(date.toLocaleDateString())
    ) {
      return true
    }
    return false
  }

  const handleSubmit = () => {
    if (selectedDates.length !== 0) {
      console.log(name, selectedDates)
    }
    setOpenSubmitAlert(true)
    // TODO: check for existing name
    // TODO: probs add a confirmation popup
  }

  return (
    <>
      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center">
        <FormControl sx={{ m: 1, minWidth: 360 }}>
          <InputLabel>Select Name</InputLabel>
          <Select
            value={name}
            label="Select Name"
            onChange={(e) => setName(e.target.value)}
          >
            {nameList.map((name, index) => <MenuItem key={index} value={name}>{name}</MenuItem>)}
          </Select>
        </FormControl>
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
            minDate={new Date(2023, 1)}
            maxDate={new Date(2023, 4, 0)}
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
        <Container className="p-3" style={{ "width": "50%" }} align="center">
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
        <Box textAlign='center'>
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
    </>
  );
}

export default Home;
