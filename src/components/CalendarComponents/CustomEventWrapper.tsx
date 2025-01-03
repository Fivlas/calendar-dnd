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

interface CustomEventWrapperProps extends EventWrapperProps<EventData> {
    children?: ReactNode;
}

const CustomEventWrapper: React.FC<CustomEventWrapperProps> = (props) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editedTitle, setEditedTitle] = useState(props.event.title);

    const { deleteEvent } = useEventsStoreActions();
    // const { deleteEvent, updateEvent } = useEventsStoreActions();

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

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTitle(e.target.value);
    };

    const handleCancelEdit = () => {
        setIsEditDialogOpen(false);
        setEditedTitle(props.event.title); // Reset to original title
    };

    const handleConfirmEdit = () => {
        if (editedTitle.trim() === "") {
            toast.error("Title cannot be empty!");
            return;
        }
        // updateEvent({ ...props.event, title: editedTitle });
        setIsEditDialogOpen(false);
        toast.success("Event has been updated!");
    };

    return (
        <>
            {/* Context Menu */}
            <ContextMenu>
                <ContextMenuTrigger>
                    {props.children}
                </ContextMenuTrigger>

                <ContextMenuContent>
                    {/* Delete Context Menu Item */}
                    <ContextMenuItem
                        className="w-32"
                        onClick={handleDeleteClick}
                    >
                        <span>Delete</span>
                    </ContextMenuItem>

                    {/* Edit Context Menu Item */}
                    <ContextMenuItem
                        className="w-32"
                        onClick={handleEditClick}
                    >
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
                    <div className="mt-4">
                        <Input
                            value={editedTitle}
                            onChange={handleEditChange}
                            placeholder="Enter new event title"
                        />
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                        <Button variant={"ghost"} onClick={handleCancelEdit}>
                            Cancel
                        </Button>
                        <Button variant={"default"} onClick={handleConfirmEdit}>
                            Save
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CustomEventWrapper;
