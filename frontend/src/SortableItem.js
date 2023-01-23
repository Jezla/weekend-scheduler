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
        <div >
          <Card body className="m-3" ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {props.id}
            <CloseButton onClick={(e) => {
              console.log(props.id)
              const index = props.items.indexOf(props.id)
              const newDates = [...props.items]
              newDates.splice(index, 1);
              props.setItems(newDates)
              e.stopPropagation()
            }}/>
          </Card>
        </div>
      </>
    )
}
