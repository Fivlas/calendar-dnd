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
    //initialize events state from hardcoded file
    events: events,
    actions: {
        addEvent: (event: EventData) => {
            set((state) => ({
                events: [...state.events, event],
            }));
        },
    },
}));