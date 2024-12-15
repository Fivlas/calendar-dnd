import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { events, Event } from "../Types/Events";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import CustomToolbar from "./CalendarComponents/CustomToolbar";

const DnDCalendar = withDragAndDrop(Calendar)
const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [myEvents, setMyEvents] = useState<Event[]>(events)

  return (
    <div className="mt-3">
      <DnDCalendar
        localizer={localizer}
        events={myEvents}
        style={{ height: 500,width: '100%' }}
        className="px-6"
        draggableAccessor={(event) => true}
        components = {{toolbar : CustomToolbar}}
      />
    </div>
  );
};

export default CalendarComponent;
