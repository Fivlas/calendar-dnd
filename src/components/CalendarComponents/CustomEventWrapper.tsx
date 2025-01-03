import { EventWrapperProps } from "react-big-calendar";
import { ReactNode, useState } from "react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { customTransition, customVariants } from "@/lib/utils";
import { useEventsStoreActions } from "@/hooks/useEventsStoreActions";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { editEventModalSchema } from "@/schemas/editEventModalSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { DateTimePicker24h } from "../ui/DateTimePicker24h";

interface CustomEventWrapperProps extends EventWrapperProps<EventData> {
    children?: ReactNode;
}

const CustomEventWrapper: React.FC<CustomEventWrapperProps> = (props) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const { deleteEvent, updateEvent } = useEventsStoreActions();

    const form = useForm<z.infer<typeof editEventModalSchema>>({
        resolver: zodResolver(editEventModalSchema),
        defaultValues: {
            startDate: props.event.start,
            endDate: props.event.end,
            title: props.event.title,
        },
    });

    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleEditClick = () => {
        setIsEditDialogOpen(true);
    };

    const handleCancelDelete = () => {
        setIsDeleteDialogOpen(false);
    };

    const handleConfirmDelete = () => {
        deleteEvent(props.event.id);
        setIsDeleteDialogOpen(false);
        toast.error("Event has been deleted!");
    };

    const handleCancelEdit = () => {
        setIsEditDialogOpen(false);
    };

    const onSubmitEditEvent = (
        values: z.infer<typeof editEventModalSchema>
    ) => {
        try {
            const editedEvent: EventData = {
                id: props.event.id,
                start: values.startDate || props.event.start,
                end: values.endDate || props.event.end,
                title: values.title || props.event.title,
            };

            updateEvent(editedEvent);
            toast.success("Event has been updated!");
        } catch (error) {
            toast.error("An error occurred while updating the event");
            console.error(error);
        } finally {
            setIsEditDialogOpen(false);
        }
    };

    return (
        <>
            {/* Context Menu */}
            <ContextMenu>
                <ContextMenuTrigger>{props.children}</ContextMenuTrigger>

                <ContextMenuContent>
                    {/* Delete Context Menu Item */}
                    <ContextMenuItem
                        className="w-32"
                        onClick={handleDeleteClick}
                    >
                        <span>Delete</span>
                    </ContextMenuItem>

                    {/* Edit Context Menu Item */}
                    <ContextMenuItem className="w-32" onClick={handleEditClick}>
                        <span>Edit</span>
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

            {/* Delete Dialog */}
            <Dialog
                variants={customVariants}
                transition={customTransition}
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent className="w-full max-w-md bg-white p-6 dark:bg-zinc-900">
                    <DialogTitle className="text-zinc-900 dark:text-white">
                        Delete Event
                    </DialogTitle>
                    <DialogDescription className="text-zinc-600 dark:text-zinc-400">
                        Are you sure you want to delete{" "}
                        <span className="font-bold">{props.event.title}</span>{" "}
                        event?
                    </DialogDescription>
                    <div className="mt-2 flex justify-end gap-2">
                        <Button variant={"ghost"} onClick={handleCancelDelete}>
                            Cancel
                        </Button>
                        <Button
                            variant={"destructive"}
                            onClick={handleConfirmDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog
                variants={customVariants}
                transition={customTransition}
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
            >
                <DialogContent className="w-full max-w-md bg-white p-6 dark:bg-zinc-900">
                    <DialogTitle className="text-zinc-900 dark:text-white">
                        Edit Event
                    </DialogTitle>
                    <DialogDescription className="text-zinc-600 dark:text-zinc-400">
                        Modify the title of{" "}
                        <span className="font-bold">{props.event.title}</span>.
                    </DialogDescription>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmitEditEvent)}
                            className="mt-4 flex flex-col space-y-4"
                        >
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

                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Date</FormLabel>
                                        <FormControl>
                                            <DateTimePicker24h
                                                modal
                                                date={field.value}
                                                setDate={(value) => {
                                                    if (value instanceof Date) {
                                                        form.setValue(
                                                            "startDate",
                                                            value
                                                        );
                                                    }
                                                }}
                                            />
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
                                            <DateTimePicker24h
                                                modal
                                                date={field.value}
                                                setDate={(value) => {
                                                    if (value instanceof Date) {
                                                        form.setValue(
                                                            "endDate",
                                                            value
                                                        );
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="mt-4 flex justify-end gap-2">
                                <Button
                                    variant={"ghost"}
                                    onClick={handleCancelEdit}
                                    type="button"
                                >
                                    Cancel
                                </Button>
                                <Button variant={"default"} type="submit">Save</Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CustomEventWrapper;
