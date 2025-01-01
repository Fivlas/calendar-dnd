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
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { customTransition, customVariants } from "@/lib/utils";

interface CustomEventWrapperProps extends EventWrapperProps<EventData> {
    children?: ReactNode;
}

const CustomEventWrapper: React.FC<CustomEventWrapperProps> = (props) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsDialogOpen(true);
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
    };

    const handleConfirmDelete = () => {
        console.log(`Deleting event with ID: ${props.event.id}`);
        setIsDialogOpen(false);
    };

    // Ensure the event wrapper can be clicked, and the context menu only shows on right-click
    return (
        <Dialog
            variants={customVariants}
            transition={customTransition}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            
        >
            <ContextMenu>
                <ContextMenuTrigger>
                    {props.children}
                </ContextMenuTrigger>

                <ContextMenuContent>
                    <DialogTrigger>
                        <ContextMenuItem
                            className="w-32"
                            onClick={handleDeleteClick}
                        >
                            <span>Delete</span>
                        </ContextMenuItem>
                    </DialogTrigger>
                </ContextMenuContent>
            </ContextMenu>
            
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
                    <Button variant={"outline"} onClick={handleCancel}>
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
    );
};

export default CustomEventWrapper;
