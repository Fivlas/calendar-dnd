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
import { useState } from "react";
import { toast } from "sonner";
import { useEventsStoreActions } from "@/hooks/useEventsStoreActions";

const CustomDateCellWrapper = (props: DateCellWrapperProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { addEvent } = useEventsStoreActions();

    const selectedDate = new Date(props.value);

    const form = useForm<z.infer<typeof addEventModalSchema>>({
        resolver: zodResolver(addEventModalSchema),
        defaultValues: {
            startDate: selectedDate,
            endDate: undefined,
            title: "",
        },
    });

    const onSubmit = (values: z.infer<typeof addEventModalSchema>) => {
        try {
            const { startDate, endDate, title } = values;

            const event: EventData = {
                id: crypto.randomUUID(),
                title,
                start: startDate,
                end: endDate,
            };

            addEvent(event);
            toast.success("Event added successfully!");
        } catch (error) {
            toast.error("An error occurred while adding the event");
            console.error(error);
        } finally {
            setIsDialogOpen(false);
        }
    };

    const excludedClassNames = ["rbc-off-range-bg", "rbc-today"];
    const shouldHaveZIndex = !excludedClassNames.some((className) =>
        (props.children.props.className || "").includes(className)
    );

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                    Make sure to add this event to your calendar to stay
                    organized and never miss it.
                </DialogDescription>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-6 flex flex-col space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Date</FormLabel>
                                    <FormControl>
                                        <DatetimePicker {...field} modal />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>End Date</FormLabel>
                                    <FormControl>
                                        <DatetimePicker {...field} modal />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Event Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Event title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
