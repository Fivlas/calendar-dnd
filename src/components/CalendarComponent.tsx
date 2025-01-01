import { useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop, {
    EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import CustomToolbar from "./CalendarComponents/CustomToolbar";
import CustomShowMore from "./CalendarComponents/CustomShowMore";
import CustomEventWrapper from "./CalendarComponents/CustomEventWrapper";
// import CustomEvent from "./CalendarComponents/CustomEvent";
import "moment-timezone";
import CustomDateCellWrapper from "./CalendarComponents/CustomDateCellWrapper";
import { useEvents } from "@/hooks/useEvents";
import { useEventsStoreActions } from "@/hooks/useEventsStoreActions";

const DnDCalendar = withDragAndDrop<EventData, object>(Calendar);
moment.tz.setDefault("Europe/Warsaw");
moment.locale("pl-PL", {
    week: {
        dow: 1,
    },
});
const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
    const events = useEvents();
    const { addEvent } = useEventsStoreActions();

    const moveEvent = useCallback(
        ({
            event,
            start,
            end,
            isAllDay: droppedOnAllDaySlot = false,
        }: EventInteractionArgs<EventData>) => {
            const typedEvent = event as EventData;

            const { allDay } = typedEvent;

            // Adjust the all-day property based on drop location
            if (!allDay && droppedOnAllDaySlot) {
                typedEvent.allDay = true;
            }
            if (allDay && !droppedOnAllDaySlot) {
                typedEvent.allDay = false;
            }

            // Update the event in the store
            const updatedEvent: EventData = {
                ...typedEvent,
                start: new Date(start),
                end: new Date(end),
                allDay: typedEvent.allDay,
            };
            addEvent(updatedEvent);
        },
        [addEvent]
    );

    const resizeEvent = useCallback(
        ({ event, start, end }: EventInteractionArgs<EventData>) => {
            const typedEvent = event as EventData;

            const updatedEvent: EventData = {
                ...typedEvent,
                start: new Date(start),
                end: new Date(end),
            };
            addEvent(updatedEvent);
        },
        [addEvent]
    );

    const handleSelectSlot = useCallback(
        ({ start, end }: { start: Date; end: Date }) => {
            const title = window.prompt("New Event Name");
            if (title) {
                const newEvent: EventData = {
                    id: crypto.randomUUID(),
                    start,
                    end,
                    title,
                };
                addEvent(newEvent);
            }
        },
        [addEvent]
    );

    const handleSelectEvent = useCallback((event: EventData) => {
        window.alert(event.title);
    }, []);

    return (
        <div className="mt-3">
            <DnDCalendar
                culture="pl-PL"
                formats={{ timeGutterFormat: "H:mm" }}
                localizer={localizer}
                events={events}
                style={{ height: 700, width: "100%" }}
                className="px-6"
                components={{
                    toolbar: CustomToolbar,
                    showMore: CustomShowMore,
                    eventWrapper: CustomEventWrapper,
                    // event: CustomEvent,
                    dateCellWrapper: CustomDateCellWrapper,
                    //@ts-ignore
                    // eventContainerWrapper: CustomDateCellWrapper,
                }}
                scrollToTime={new Date()}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                onEventDrop={moveEvent}
                onEventResize={resizeEvent}
                enableAutoScroll
                popup
                resizable
                selectable
            />
        </div>
    );
};

export default CalendarComponent;
