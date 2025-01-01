import { useEventsStore } from "@/store/events.store";

export const useEventsStoreActions = () => {
    return useEventsStore((state) => state.actions);
};
