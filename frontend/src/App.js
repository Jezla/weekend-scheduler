import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import {DndContext, closestCenter} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import { useState } from 'react';
import { SortableItem } from './SortableItem';
import Calendar from 'react-calendar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {
  const [dates, setDates] = useState(["22/01/2023", "25/02/2023", "27/03/2023"]);
  const [value, onChange] = useState(new Date());

  return (
    <>
      <div>
        <TextField id="outlined-basic" label="First Name" variant="outlined"/>
        <TextField id="outlined-basic" label="Last Name" variant="outlined"/>
      </div>
      <div>
      <Calendar onChange={onChange} value={value} />
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <Container className="p-3" style={{ "width": "50%" }} align="center">
            <h3>Sort your preferences</h3>
            <SortableContext items={dates} strategy={verticalListSortingStrategy}>
              {dates.map(language => <SortableItem key={language} id={language} />)}
            </SortableContext>
          </Container>
        </DndContext>
        <Button variant="contained">Submit</Button>
      </div>
    </>
  );

  function handleDragEnd(event) {
    console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over.id);

    if (active.id !== over.id) {
      setDates((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        console.log(arrayMove(items, activeIndex, overIndex));
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }
}

export default App;
