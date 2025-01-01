import { z } from "zod";

export const addEventModalSchema = z.object({
    id: z.string().optional(),
    startDate: z.date({
        required_error: "Please select a date and time",
        invalid_type_error: "That's not a date!",
    }),
    endDate: z.date({
        required_error: "Please select a date and time",
        invalid_type_error: "That's not a date!",
    }),
    title: z
        .string()
        .min(2, {
            message: "Title must be at least 2 characters long",
        })
        .max(50, {
            message: "Title must be at most 50 characters long",
        }),
});
