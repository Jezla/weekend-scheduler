import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import { CloseButton } from "react-bootstrap";
import Grid from '@mui/material/Unstable_Grid2';

const SortableItem = (props) => {
  // Component for preference list sortable item
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({id: props.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
    pl: 2,
    pr: 2,
    pt: 1,
    pb: 1,
    mb: 1,
    mt: 1,
    border: '1px solid #ccc',
    borderRadius: '4px'
  }

  return (
    <div>
      <Grid
        container
        justifyContent="space-between"
        ref={setNodeRef}
        sx={style}
        {...attributes}
        {...listeners}
      >
        <Grid>
          {props.items.indexOf(props.id) + 1}
        </Grid>
        <Grid>
          {props.id}
        </Grid>
        <Grid alignItems="center" justifyContent="center">
          <CloseButton onClick={(e) => {
            const index = props.items.indexOf(props.id)
            const newDates = [...props.items]
            newDates.splice(index, 1);
            props.setItems(newDates)
            e.stopPropagation()
          }}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default SortableItem
