import { DateCellWrapperProps } from "react-big-calendar";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu";
import { Button } from "../ui/button";
import { DatetimePicker } from "../ui/dateTimePicker";
import { Input } from "../ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addEventModalSchema } from "@/schemas/addEventModalSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";

const CustomDateCellWrapper = (props: DateCellWrapperProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        new Date(props.value)
    );
    const [selectedDate2, setSelectedDate2] = useState<Date | undefined>(undefined);

    // Hook form for handling input validation and submission
    const form = useForm<z.infer<typeof addEventModalSchema>>({
        resolver: zodResolver(addEventModalSchema),
        defaultValues: {
            startDate: selectedDate,
            endDate: undefined,
            title: "",
        },
    });

    // Submission handler
    const onSubmit = (values: z.infer<typeof addEventModalSchema>) => {
        console.log("Event Submitted:", values);
        // Handle event creation logic here
    };

    // Excluded class names for conditional styling
    const excludedClassNames = ["rbc-off-range-bg", "rbc-today"];
    const shouldHaveZIndex = !excludedClassNames.some((className) =>
        (props.children.props.className || "").includes(className)
    );

    return (
        <Dialog>
            <ContextMenu>
                <ContextMenuTrigger
                    className={`pointer-events-auto ${
                        props.children.props.className
                    } ${shouldHaveZIndex ? "z-10" : ""}`}
                >
                    {props.children}
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <DialogTrigger>
                        <ContextMenuItem className="w-32">
                            <span>Add Event</span>
                        </ContextMenuItem>
                    </DialogTrigger>
                </ContextMenuContent>
            </ContextMenu>
            <DialogContent className="w-full max-w-md bg-white p-6 dark:bg-zinc-900">
                <DialogTitle className="text-zinc-900 dark:text-white">
                    Add Event
                </DialogTitle>
                <DialogDescription className="text-zinc-600 dark:text-zinc-400">
                    Make sure to add this event to your calendar to stay organized and never miss it.
                </DialogDescription>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-6 flex flex-col space-y-4"
                    >
                        {/* Start Date Field */}
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Date</FormLabel>
                                    <FormControl>
                                        <DatetimePicker
                                            {...field}
                                            modal
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* End Date Field */}
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>End Date</FormLabel>
                                    <FormControl>
                                        <DatetimePicker
                                            {...field}
                                            modal
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Event Title Field */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Event Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter event title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button type="submit" className="mt-4">
                            Add Event
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CustomDateCellWrapper;
