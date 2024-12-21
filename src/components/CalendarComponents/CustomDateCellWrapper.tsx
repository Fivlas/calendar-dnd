import { DateCellWrapperProps } from "react-big-calendar";
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
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";
import { DatetimePicker } from "../ui/dateTimePicker";
import { Input } from "../ui/input";

const CustomDateCellWrapper = (props: DateCellWrapperProps) => {
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(props.value));
    const [selectedDate2, setSelectedDate2] = useState<Date | undefined>(undefined);
    const [title, setTitle] = useState<string>("");

    const excludedClassNames = ["rbc-off-range-bg", "rbc-today"];
    const shouldHaveZIndex = !excludedClassNames.some((className) =>
        (props.children.props.className || "").includes(className)
    );

    const clickHandler = () => {
        console.log("Start Date:", selectedDate);
        console.log("End Date:", selectedDate2);
        console.log("Event Title:", title);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <ContextMenu>
                <ContextMenuTrigger
                    className={`pointer-events-auto ${
                        props.children.props.className
                    } ${shouldHaveZIndex ? "" : ""}`}
                >
                    {props.children}
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <DialogTrigger asChild>
                        <ContextMenuItem className="px-2.5 md:px-2">
                            <span>Add Event</span>
                        </ContextMenuItem>
                    </DialogTrigger>
                </ContextMenuContent>
            </ContextMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Event</DialogTitle>
                    <DialogDescription>
                        Make sure to add this event to your calendar to stay
                        organized and never miss it.
                    </DialogDescription>
                </DialogHeader>
                <Label>Start Date</Label>
                <DatetimePicker setDate={setSelectedDate} date={selectedDate} />
                <Label>End Date</Label>
                <DatetimePicker
                    setDate={setSelectedDate2}
                    date={selectedDate2}
                />
                <Label>Event Title</Label>
                <Input
                    placeholder="Sylwester u Zduniaka"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
                <DialogFooter>
                    <Button type="submit" onClick={clickHandler}>
                        Add
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CustomDateCellWrapper;
