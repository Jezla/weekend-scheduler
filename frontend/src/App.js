import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import {DndContext, closestCenter, useSensor, useSensors, PointerSensor} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import { useState, useEffect } from 'react';
import { SortableItem } from './SortableItem';
import Calendar from 'react-calendar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {
  const [name, setName] = useState("");
  const [dates, setListDates] = useState([]);
  const [value, setCalendarDate] = useState(new Date());
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      }
    })
  )

  useEffect(() => {
    // Get backend input for all valid weekends and public holidays
    // Add the dates to list/calendar format
  }, [])

  const setDates = (date) => {
    setCalendarDate(date)
    if (dates.length !== 6) {
      setListDates([...dates, date.toLocaleDateString()])
      // Put some sort of max alert popup thingo
    }
  }

  const setDisabled = (date) => {
    if ((date.getDay() !== 0 &&
        date.getDay() !== 6) ||
        dates.includes(date.toLocaleDateString())
    ) {
      return true
    }
    return false
  }

  return (
    <>
      <div>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => {setName(e.target.value)}}
        />
      </div>
      <div>
        <Calendar
          onChange={date => setDates(date)}
          value={value}
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
            <SortableContext items={dates} strategy={verticalListSortingStrategy}>
              {dates.map(date =>
                <SortableItem key={date} id={date} items={dates} setItems={setListDates}/>
              )}
            </SortableContext>
          </DndContext>
        </Container>
        <Button
          variant="contained"
          onClick={() => {
            console.log(name, dates)
          }}
        >
          Submit
        </Button>
      </div>
    </>
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setListDates((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        console.log(arrayMove(items, activeIndex, overIndex));
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }
}

export default App;
