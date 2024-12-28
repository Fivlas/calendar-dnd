import { DateCellWrapperProps } from "react-big-calendar";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { DatetimePicker } from "../ui/dateTimePicker";
import { Input } from "../ui/input";
import { Transition, Variants } from "motion/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";

const CustomDateCellWrapper = (props: DateCellWrapperProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        new Date(props.value)
    );
    const [selectedDate2, setSelectedDate2] = useState<Date | undefined>(
        undefined
    );
    const [title, setTitle] = useState<string>("");

    const excludedClassNames = ["rbc-off-range-bg", "rbc-today"];
    const shouldHaveZIndex = !excludedClassNames.some((className) =>
        (props.children.props.className || "").includes(className)
    );

    const customVariants: Variants = {
        initial: {
            opacity: 0,
            scale: 0.95,
            y: 40,
        },
        animate: {
            opacity: 1,
            scale: 1,
            y: 0,
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            y: 40,
        },
    };

    const customTransition: Transition = {
        type: "spring",
        bounce: 0,
        duration: 0.25,
    };

    const clickHandler = () => {
        console.log("Start Date:", selectedDate);
        console.log("End Date:", selectedDate2);
        console.log("Event Title:", title);
    };


    return (
        // <Dialog open={open} onOpenChange={setOpen}>
        //     <ContextMenu>
        //         <ContextMenuTrigger
        //             className={`pointer-events-auto ${
        //                 props.children.props.className
        //             } ${shouldHaveZIndex ? "" : ""}`}
        //         >
        //             {props.children}
        //         </ContextMenuTrigger>
        //         <ContextMenuContent>
        //             <DialogTrigger>
        //                 <ContextMenuItem className="px-2.5 md:px-2">
        //                     <span>Add Event</span>
        //                 </ContextMenuItem>
        //             </DialogTrigger>
        //         </ContextMenuContent>
        //     </ContextMenu>
        //     <DialogContent>
        //         <DialogHeader>
        //             <DialogTitle>Add Event</DialogTitle>
        //             <DialogDescription>
        //                 Make sure to add this event to your calendar to stay
        //                 organized and never miss it.
        //             </DialogDescription>
        //         </DialogHeader>
        //         <Label>Start Date</Label>
        //         <DatetimePicker setDate={setSelectedDate} date={selectedDate} />
        //         <Label>End Date</Label>
        //         <DatetimePicker
        //             setDate={setSelectedDate2}
        //             date={selectedDate2}
        //         />
        //         <Label>Event Title</Label>
        //         <Input
        //             placeholder="Sylwester u Zduniaka"
        //             value={title}
        //             onChange={(e) => setTitle(e.currentTarget.value)}
        //         />
        //             <Button type="submit" onClick={clickHandler}>
        //                 Add
        //             </Button>
        //     </DialogContent>
        // </Dialog>

        <Dialog variants={customVariants} transition={customTransition}>
            <ContextMenu>
                <ContextMenuTrigger
                    className={`pointer-events-auto ${
                        props.children.props.className
                    } ${shouldHaveZIndex ? "" : ""}`}
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
                <div className="mt-6 flex flex-col space-y-4">
                    <Label>Start Date</Label>
                    <DatetimePicker
                        setDate={setSelectedDate}
                        date={selectedDate}
                        modal
                    />

                    <Label>End Date</Label>
                    <DatetimePicker
                        setDate={setSelectedDate2}
                        date={selectedDate2}
                        modal
                    />

                    <Label>Event Title</Label>
                    <Input
                        placeholder="Sylwester u Zduniaka"
                        value={title}
                        onChange={(e) => setTitle(e.currentTarget.value)}
                    />
                    <Button type="submit" onClick={clickHandler}>
                        Add
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CustomDateCellWrapper;
