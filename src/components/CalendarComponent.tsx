import { useCallback, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop, {
    EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import CustomToolbar from "./CalendarComponents/CustomToolbar";
import { events } from "@/data/EventsData";
import CustomShowMore from "./CalendarComponents/CustomShowMore";
import CustomEventWrapper from "./CalendarComponents/CustomEventWrapper";
import CustomEvent from "./CalendarComponents/CustomEvent";
import "moment-timezone";
import CustomDateCellWrapper from "./CalendarComponents/CustomDateCellWrapper";

const DnDCalendar = withDragAndDrop(Calendar);
moment.tz.setDefault("Europe/Warsaw");
moment.locale("pl-PL", {
    week: {
        dow: 1,
    },
});
const localizer = momentLocalizer(moment);

const CalendarComponent = () => {

    const [myEvents, setEvents] = useState<EventData[]>(events);

    const moveEvent = useCallback(
        ({
            event,
            start,
            end,
            isAllDay: droppedOnAllDaySlot = false,
        }: EventInteractionArgs<object>) => {
            const typedEvent = event as EventData;

            const { allDay } = typedEvent;

            if (!allDay && droppedOnAllDaySlot) {
                typedEvent.allDay = true;
            }
            if (allDay && !droppedOnAllDaySlot) {
                typedEvent.allDay = false;
            }

            setEvents((prev) => {
                const existing = prev.find((ev) => ev.id === typedEvent.id);
                if (existing) {
                    const filtered = prev.filter(
                        (ev) => ev.id !== typedEvent.id
                    );
                    return [
                        ...filtered,
                        {
                            ...existing,
                            start: new Date(start),
                            end: new Date(end),
                            allDay: typedEvent.allDay,
                        },
                    ];
                }
                return prev;
            });
        },
        [setEvents]
    );

    const resizeEvent = useCallback(
        ({ event, start, end }: EventInteractionArgs<object>) => {
            const typedEvent = event as EventData;

            setEvents((prev) => {
                const existing = prev.find((ev) => ev.id === typedEvent.id);
                if (existing) {
                    const filtered = prev.filter(
                        (ev) => ev.id !== typedEvent.id
                    );
                    return [
                        ...filtered,
                        {
                            ...existing,
                            start: new Date(start),
                            end: new Date(end),
                        },
                    ];
                }
                return prev;
            });
        },
        [setEvents]
    );

    const handleSelectSlot = useCallback(
        ({ start, end }: { start: Date; end: Date }) => {
            const title = window.prompt("New Event Name");
            if (title) {
                const newEvent: EventData = {
                    id: new Date().getTime(),
                    start,
                    end,
                    title,
                };
                setEvents((prev) => [...prev, newEvent]);
            }
        },
        [setEvents]
    );

    const handleSelectEvent = useCallback((event: object) => {
        const typedEvent = event as EventData;
        window.alert(typedEvent.title);
    }, []);

    return (
        <div className="mt-3">
            <DnDCalendar
                culture="pl-PL"
                formats={{ timeGutterFormat: "H:mm" }}
                localizer={localizer}
                events={myEvents}
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
