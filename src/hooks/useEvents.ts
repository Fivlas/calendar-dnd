import { useEventsStore } from "@/store/events.store";

export const useEvents = () => {
    return useEventsStore((state) => state.events);
};
