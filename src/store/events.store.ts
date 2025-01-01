import { create } from 'zustand';
import { events } from "@/data/EventsData";

interface EventsStore {
    events: EventData[];
    actions: EventsStoreActions;
}

interface EventsStoreActions {
    addEvent: (event: EventData) => void;
}

export const useEventsStore = create<EventsStore>((set) => ({
    // Initialize events state from hardcoded file
    events: events,
    actions: {
        addEvent: (event: EventData) => {
            set((state) => {
                const eventIndex = state.events.findIndex((e) => e.id === event.id);

                if (eventIndex !== -1) {
                    const updatedEvents = [...state.events];
                    updatedEvents[eventIndex] = event;
                    return { events: updatedEvents };
                } else {
                    return { events: [...state.events, event] };
                }
            });
        },
    },
}));