import { create } from 'zustand';
import { events } from "@/data/EventsData";

interface EventsStore {
    events: EventData[];
    actions: EventsStoreActions;
}

export interface EventsStoreActions {
    addEvent: (event: EventData) => void;
    deleteEvent: (eventId: string) => void;
    updateEvent: (event: EventData) => void;
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
        deleteEvent: (eventId: string) => {
            set((state) => {
                const updatedEvents = state.events.filter((e) => e.id !== eventId);
                return { events: updatedEvents };
            });
        },
        updateEvent: (event: EventData) => {
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