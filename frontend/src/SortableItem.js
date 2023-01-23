import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import { CloseButton, Card } from "react-bootstrap";

export function SortableItem(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
      <>
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
          <Card body className="m-3">
            {props.id}
          </Card>
        </div>
        <CloseButton onClick={() => {
          const index = props.dateList.indexOf(props.id)
          const newDates = [...props.dateList]
          newDates.splice(index, 1);
          props.setDates(newDates)
        }}/>
      </>
    )
}
