import { z } from "zod";

export const addEventModalSchema = z
    .object({
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
    })
    .refine((data) => data.endDate >= data.startDate, {
        message: "End date cannot be earlier than the start date",
        path: ["endDate"],
    });

export const editEventModalSchema = z
    .object({
        startDate: z
            .date({
                invalid_type_error: "That's not a date!",
            })
            .optional(),
        endDate: z
            .date({
                invalid_type_error: "That's not a date!",
            })
            .optional(),
        title: z
            .string()
            .min(2, {
                message: "Title must be at least 2 characters long",
            })
            .max(50, {
                message: "Title must be at most 50 characters long",
            })
            .optional(),
    })
    .refine(
        (data) => {
            if (data.startDate && data.endDate) {
                return data.endDate >= data.startDate;
            }
            return true;
        },
        {
            message: "End date cannot be earlier than the start date",
            path: ["endDate"],
        }
    );
