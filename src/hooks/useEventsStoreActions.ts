import { EventsStoreActions, useEventsStore } from "@/store/events.store";

export const useEventsStoreActions = () : EventsStoreActions => {
    return useEventsStore((state) => state.actions);
};
