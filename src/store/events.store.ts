import { create } from 'zustand';

interface EventsStore {
    events: EventData[];
    actions: EventsStoreActions;
}

interface EventsStoreActions {
    addEvent: (event: EventData) => void;
}

export const useEventsStore = create<EventsStore>((set) => ({
    events: [],
    actions: {
        addEvent: (event: EventData) => {
            set((state) => ({
                events: [...state.events, event],
            }));
        },
    },
}));