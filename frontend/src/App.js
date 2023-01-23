import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import {DndContext, closestCenter, useSensor, useSensors, PointerSensor} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import { useState, useEffect } from 'react';
import { SortableItem } from './SortableItem';
import Calendar from 'react-calendar';
import {
  TextField, Button, InputLabel, MenuItem, FormControl, Select
} from '@mui/material';

function App() {
  const [name, setName] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [listDates, setListDates] = useState([]);
  const [nameList, setNameList] = useState(['asldkjaslkd asdkja', 'austin lai', 'thidaskld askdid']);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      }
    })
  )

  const handleDragEnd = (event) => {
    const {active, over} = event;
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
      // Put some sort of max alert popup thingo
    }
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
    console.log(name, selectedDates)
    // TODO: probs add a confirmation popup
  }

  return (
    <>
      <div>
        {/*
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => {setName(e.target.value)}}
          />
        */}
        <FormControl sx={{ m: 1, minWidth: 360 }} size="small">
          <InputLabel>Select Name</InputLabel>
          <Select
            value={name}
            label="Select Name"
            onChange={(e) => setName(e.target.value)}
          >
            {nameList.map((name, index) => <MenuItem key={index} value={name}>{name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
      <div>
        <Calendar
          onChange={date => setDates(date)}
          value={calendarDate}
          minDate={new Date(2023, 1)}
          maxDate={new Date(2023, 4, 0)}
          minDetail="month"
          next2Label={null}
          prev2Label={null}
          tileDisabled={({date}) => setDisabled(date)}
          showNeighboringMonth={false}
        />
        <Container className="p-3" style={{ "width": "50%" }} align="center">
          <h3>Sort your preferences</h3>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={selectedDates} strategy={verticalListSortingStrategy}>
              {selectedDates.map(date =>
                <SortableItem key={date} id={date} items={selectedDates} setItems={setSelectedDates}/>
              )}
            </SortableContext>
          </DndContext>
        </Container>
        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </>
  );

}

export default App;
